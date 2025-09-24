package com.example

import sangria.schema._

object GraphQLSchema {
  
  // Definir el tipo Alumno en GraphQL
  val AlumnoType: ObjectType[Unit, Alumno] = ObjectType(
    "Alumno",
    "Un alumno del sistema",
    fields[Unit, Alumno](
      Field("id", IntType, resolve = _.value.id),
      Field("nombre", StringType, resolve = _.value.nombre),
      Field("apellidos", StringType, resolve = _.value.apellidos),
      Field("correo", StringType, resolve = _.value.correo)
    )
  )
  
  // Argumentos para las mutaciones
  val NombreArg = Argument("nombre", StringType)
  val ApellidosArg = Argument("apellidos", StringType)
  val CorreoArg = Argument("correo", StringType)
  val IdArg = Argument("id", IntType)
  
  // Definir las queries
  val QueryType: ObjectType[Unit, Unit] = ObjectType(
    "Query",
    fields[Unit, Unit](
      Field(
        "alumnos",
        ListType(AlumnoType),
        description = Some("Obtener todos los alumnos"),
        resolve = _ => AlumnoRepository.findAll()
      ),
      Field(
        "alumno",
        OptionType(AlumnoType),
        description = Some("Obtener un alumno por ID"),
        arguments = IdArg :: Nil,
        resolve = ctx => AlumnoRepository.findById(ctx.arg(IdArg))
      ),
      Field(
        "buscarAlumnosPorNombre",
        ListType(AlumnoType),
        description = Some("Buscar alumnos por nombre"),
        arguments = Argument("nombre", StringType) :: Nil,
        resolve = ctx => AlumnoRepository.findByNombre(ctx.arg("nombre"))
      )
    )
  )
  
  // Definir las mutaciones
  val MutationType: ObjectType[Unit, Unit] = ObjectType(
    "Mutation",
    fields[Unit, Unit](
      Field(
        "crearAlumno",
        AlumnoType,
        description = Some("Crear un nuevo alumno"),
        arguments = NombreArg :: ApellidosArg :: CorreoArg :: Nil,
        resolve = ctx => AlumnoRepository.create(
          ctx.arg(NombreArg),
          ctx.arg(ApellidosArg),
          ctx.arg(CorreoArg)
        )
      ),
      Field(
        "actualizarAlumno",
        OptionType(AlumnoType),
        description = Some("Actualizar un alumno existente"),
        arguments = IdArg :: NombreArg :: ApellidosArg :: CorreoArg :: Nil,
        resolve = ctx => AlumnoRepository.update(
          ctx.arg(IdArg),
          ctx.arg(NombreArg),
          ctx.arg(ApellidosArg),
          ctx.arg(CorreoArg)
        )
      ),
      Field(
        "eliminarAlumno",
        BooleanType,
        description = Some("Eliminar un alumno por ID"),
        arguments = IdArg :: Nil,
        resolve = ctx => AlumnoRepository.delete(ctx.arg(IdArg))
      )
    )
  )
  
  val schema: Schema[Unit, Unit] = Schema(
    query = QueryType,
    mutation = Some(MutationType)
  )
}