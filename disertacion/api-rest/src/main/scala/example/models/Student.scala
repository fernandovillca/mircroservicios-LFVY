package models

import spray.json.DefaultJsonProtocol._
import spray.json.{JsArray, JsValue, RootJsonFormat, DeserializationException}
import spray.json.enrichAny 

case class Estudiante(
    id: Option[Long] = None,
    nombre: String,
    apellido: String,
    edad: Int,
    carrera: String,
    matriculado: Boolean = false,
    fechaCreacion: Option[String] = None
)

case class CreateEstudianteRequest(
    nombre: String,
    apellido: String,
    edad: Int,
    carrera: String
)

case class UpdateEstudianteRequest(
    nombre: Option[String] = None,
    apellido: Option[String] = None,
    edad: Option[Int] = None,
    carrera: Option[String] = None,
    matriculado: Option[Boolean] = None
)

object EstudianteJsonProtocol {
  implicit val estudianteFormat: RootJsonFormat[Estudiante] = jsonFormat7(Estudiante.apply)
  implicit val createEstudianteRequestFormat: RootJsonFormat[CreateEstudianteRequest] = jsonFormat4(CreateEstudianteRequest.apply)
  implicit val updateEstudianteRequestFormat: RootJsonFormat[UpdateEstudianteRequest] = jsonFormat5(UpdateEstudianteRequest.apply)
  
  implicit def seqEstudianteFormat: RootJsonFormat[Seq[Estudiante]] = new RootJsonFormat[Seq[Estudiante]] {
    def write(estudiantes: Seq[Estudiante]) = JsArray(estudiantes.map(_.toJson).toVector)
    def read(value: JsValue) = value match {
      case JsArray(elements) => elements.map(_.convertTo[Estudiante]).toSeq
      case _ => throw DeserializationException("Expected JsArray")
    }
  }
}