package com.example

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.headers.`Access-Control-Allow-Origin`
import akka.http.scaladsl.model.headers.`Access-Control-Allow-Methods`
import akka.http.scaladsl.model.headers.`Access-Control-Allow-Headers`
import akka.http.scaladsl.model.HttpMethods._
import de.heikoseeberger.akkahttpjson4s.Json4sSupport
import org.json4s.{DefaultFormats, native}
import sangria.ast.Document
import sangria.execution._
import sangria.marshalling.json4s.native._
import sangria.parser.QueryParser

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success}

import org.json4s.JsonAST.JValue

case class GraphQLRequest(query: String)

object AkkaQuickstart extends App with Json4sSupport {

  implicit val system: ActorSystem[Nothing] = ActorSystem(Behaviors.empty, "GraphQLServer")
  implicit val executionContext: ExecutionContext = system.executionContext
  implicit val serialization: native.Serialization.type = native.Serialization
  implicit val formats: DefaultFormats.type = DefaultFormats

  // Configurar CORS
  val corsHeaders = List(
    `Access-Control-Allow-Origin`.*,
    `Access-Control-Allow-Methods`(GET, POST, PUT, DELETE, OPTIONS),
    `Access-Control-Allow-Headers`("Content-Type", "Authorization", "X-Requested-With")
  )

  def executeGraphQL(query: Document): Future[Either[Throwable, JValue]] = {
    Executor.execute(
      schema = GraphQLSchema.schema,
      queryAst = query,
      userContext = ()
    ).map(Right(_)).recover { case ex => Left(ex) }
  }

  val route: Route =
    respondWithHeaders(corsHeaders) {
      path("graphql") {
        options {
          complete(StatusCodes.OK)
        } ~
        post {
          entity(as[GraphQLRequest]) { request =>
            QueryParser.parse(request.query) match {
              case Success(queryAst) =>
                onComplete(executeGraphQL(queryAst)) {
                  case Success(Right(result)) =>
                    complete(StatusCodes.OK, result)
                  case Success(Left(error)) =>
                    complete(StatusCodes.BadRequest -> Map("error" -> error.getMessage, "message" -> "Bad Request"))
                  case Failure(error) =>
                    complete(StatusCodes.InternalServerError -> Map("error" -> error.getMessage, "message" -> "Internal Server Error"))
                }
              case Failure(error) =>
                complete(StatusCodes.BadRequest -> Map("error" -> s"Query parsing error: ${error.getMessage}", "message" -> "Bad Request"))
            }
          }
        } ~
        get {
          parameter("query") { query =>
            QueryParser.parse(query) match {
              case Success(queryAst) =>
                onComplete(executeGraphQL(queryAst)) {
                  case Success(Right(result)) =>
                     complete(StatusCodes.OK, result)
                  case Success(Left(error)) =>
                    complete(StatusCodes.BadRequest -> Map("error" -> error.getMessage, "message" -> "Bad Request"))
                  case Failure(error) =>
                    complete(StatusCodes.InternalServerError -> Map("error" -> error.getMessage, "message" -> "Internal Server Error"))
                }
              case Failure(error) =>
                complete(StatusCodes.BadRequest -> Map("error" -> s"Query parsing error: ${error.getMessage}", "message" -> "Bad Request"))
            }
          }
        }
      }
    }

  // Iniciar el servidor
  val bindingFuture = Http().newServerAt("localhost", 5000).bind(route)

  bindingFuture.onComplete {
    case Success(binding) =>
      val address = binding.localAddress
      println(s"""
        |   Servidor GraphQL iniciado exitosamente!
        |   Dirección: http://${address.getHostString}:${address.getPort}
        |   GraphQL Endpoint: http://${address.getHostString}:${address.getPort}/graphql
        |
        |   Servidor corriendo... Usa Ctrl+C para detener
        |""".stripMargin)

      sys.addShutdownHook {
        println("Cerrando servidor...")
        bindingFuture
          .flatMap(_.unbind())
          .onComplete(_ => system.terminate())
      }

    case Failure(exception) =>
      println(s"Error al iniciar el servidor: ${exception.getMessage}")
      system.terminate()
  }
}
