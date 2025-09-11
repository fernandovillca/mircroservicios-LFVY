package routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import repositories.EstudianteRepository
import models.{CreateEstudianteRequest, UpdateEstudianteRequest}
import models.EstudianteJsonProtocol._
import spray.json._
import scala.concurrent.ExecutionContext
import scala.util.{Success, Failure}

class EstudianteRoutes(estudianteRepository: EstudianteRepository)(implicit ec: ExecutionContext) {
  
  val routes: Route = pathPrefix("api" / "estudiantes") {
    concat(
      // GET /api/estudiantes - Obtener todos los estudiantes
      pathEnd {
        get {
          onComplete(estudianteRepository.getAllEstudiantes()) {
            case Success(estudiantes) => complete(StatusCodes.OK, estudiantes)
            case Failure(ex) => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
          }
        }
      },
      
      // POST /api/estudiantes - Crear un nuevo estudiante
      pathEnd {
        post {
          entity(as[CreateEstudianteRequest]) { request =>
            onComplete(estudianteRepository.createEstudiante(request)) {
              case Success(estudiante) => complete(StatusCodes.Created, estudiante)
              case Failure(ex) => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
            }
          }
        }
      },
      
      // GET /api/estudiantes/{id} - Obtener un estudiante por ID
      path(LongNumber) { id =>
        get {
          onComplete(estudianteRepository.getEstudianteById(id)) {
            case Success(Some(estudiante)) => complete(estudiante)
            case Success(None) => complete(StatusCodes.NotFound, "Estudiante not found")
            case Failure(ex) => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
          }
        }
      },
      
      // PUT /api/estudiantes/{id} - Actualizar un estudiante
      path(LongNumber) { id =>
        put {
          entity(as[UpdateEstudianteRequest]) { request =>
            onComplete(estudianteRepository.updateEstudiante(id, request)) {
              case Success(Some(estudiante)) => complete(estudiante)
              case Success(None) => complete(StatusCodes.NotFound, "Estudiante not found")
              case Failure(ex) => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
            }
          }
        }
      },
      
      // DELETE /api/estudiantes/{id} - Eliminar un estudiante
      path(LongNumber) { id =>
        delete {
          onComplete(estudianteRepository.deleteEstudiante(id)) {
            case Success(true) => complete(StatusCodes.NoContent)
            case Success(false) => complete(StatusCodes.NotFound, "Estudiante not found")
            case Failure(ex) => complete(StatusCodes.InternalServerError, s"Error: ${ex.getMessage}")
          }
        }
      },
    )
  }
}