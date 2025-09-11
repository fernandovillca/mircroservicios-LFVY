package database

import slick.jdbc.MySQLProfile.api._
import models.Estudiante
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class EstudianteTable(tag: Tag) extends Table[Estudiante](tag, "estudiantes") {
  def id = column[Option[Long]]("id", O.PrimaryKey, O.AutoInc)
  def nombre = column[String]("nombre")
  def apellido = column[String]("apellido")  
  def edad = column[Int]("edad")
  def carrera = column[String]("carrera")
  def matriculado = column[Boolean]("matriculado")
  def fechaCreacion = column[Option[String]]("fecha_creacion")

  def * = (id, nombre, apellido, edad, carrera, matriculado, fechaCreacion).mapTo[Estudiante]
}

object DatabaseConfig {
  val db = Database.forConfig("mysql")
  val estudiantes = TableQuery[EstudianteTable]
  
  def createTableIfNotExists(): Unit = {
    import scala.concurrent.ExecutionContext.Implicits.global
    import scala.concurrent.duration._
    import scala.concurrent.Await
    
    try {
      Await.result(db.run(estudiantes.schema.createIfNotExists), 10.seconds)
      println("Tabla 'estudiantes' creada o ya existe")
    } catch {
      case ex: Exception =>
        println(s"Error al crear la tabla: ${ex.getMessage}")
    }
  }
}