package repositories

import database.DatabaseConfig._
import models.{Estudiante, CreateEstudianteRequest, UpdateEstudianteRequest}
import slick.jdbc.MySQLProfile.api._
import scala.concurrent.Future
import scala.concurrent.ExecutionContext
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class EstudianteRepository(implicit ec: ExecutionContext) {
  
  private val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
  
  def getAllEstudiantes(): Future[Seq[Estudiante]] = {
    db.run(estudiantes.result)
  }
  
  def getEstudianteById(id: Long): Future[Option[Estudiante]] = {
    db.run(estudiantes.filter(_.id === Some(id)).result.headOption)
  }
  
  def createEstudiante(request: CreateEstudianteRequest): Future[Estudiante] = {
    val now = LocalDateTime.now().format(formatter)
    val estudiante = Estudiante(
      nombre = request.nombre,
      apellido = request.apellido,
      edad = request.edad,
      carrera = request.carrera,
      matriculado = false,
      fechaCreacion = Some(now)
    )
    
    val insertQuery = (estudiantes returning estudiantes.map(_.id)) += estudiante
    
    db.run(insertQuery).map { generatedId =>
      estudiante.copy(id = generatedId)
    }
  }
  
  def updateEstudiante(id: Long, request: UpdateEstudianteRequest): Future[Option[Estudiante]] = {
    getEstudianteById(id).flatMap {
      case Some(existingEstudiante) =>
        val updatedEstudiante = Estudiante(
          id = existingEstudiante.id,
          nombre = request.nombre.getOrElse(existingEstudiante.nombre),
          apellido = request.apellido.getOrElse(existingEstudiante.apellido),
          edad = request.edad.getOrElse(existingEstudiante.edad),
          carrera = request.carrera.getOrElse(existingEstudiante.carrera),
          matriculado = request.matriculado.getOrElse(existingEstudiante.matriculado),
          fechaCreacion = existingEstudiante.fechaCreacion
        )
        
        val updateQuery = estudiantes.filter(_.id === Some(id)).update(updatedEstudiante)
        
        db.run(updateQuery).map(_ => Some(updatedEstudiante))
      case None =>
        Future.successful(None)
    }
  }
  
  def deleteEstudiante(id: Long): Future[Boolean] = {
    db.run(estudiantes.filter(_.id === Some(id)).delete).map(_ > 0)
  }
}