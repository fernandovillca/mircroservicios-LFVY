import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import routes.EstudianteRoutes
import repositories.EstudianteRepository
import database.DatabaseConfig
import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.io.StdIn

object Main {
  
  def main(args: Array[String]): Unit = {
    
    implicit val system: ActorSystem[Nothing] = ActorSystem(Behaviors.empty, "estudiantes-api")
    implicit val executionContext: ExecutionContextExecutor = system.executionContext
    
    // Inicializar base de datos
    DatabaseConfig.createTableIfNotExists()
    
    // Crear repositorio y rutas
    val estudianteRepository = new EstudianteRepository()
    val estudianteRoutes = new EstudianteRoutes(estudianteRepository)
    
    val routes: Route = estudianteRoutes.routes
    
    val bindingFuture: Future[Http.ServerBinding] = Http().newServerAt("localhost", 9090).bind(routes)
    
    println("Servidor iniciado en http://localhost:9090/")
    println("Endpoints disponibles:")
    println("  GET    /api/estudiantes           - Obtener todos los estudiantes")
    println("  POST   /api/estudiantes           - Crear un nuevo estudiante")
    println("  GET    /api/estudiantes/{id}      - Obtener estudiante por ID")
    println("  PUT    /api/estudiantes/{id}      - Actualizar estudiante")
    println("  DELETE /api/estudiantes/{id}      - Eliminar estudiante")
    println("\nPresiona RETURN para detener el servidor...")
    
    StdIn.readLine() 
    
    bindingFuture
      .flatMap(_.unbind()) 
      .onComplete(_ => system.terminate())
  }
}