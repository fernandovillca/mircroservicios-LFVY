package com.example

import java.util.concurrent.atomic.AtomicInteger
import scala.collection.mutable

case class Alumno(
  id: Int,
  nombre: String,
  apellidos: String,
  correo: String
)

object AlumnoRepository {
  private val idCounter = new AtomicInteger(1)
  private val alumnos = mutable.Map[Int, Alumno](
    1 -> Alumno(1, "Juan", "Pérez González", "juan.perez@email.com"),
    2 -> Alumno(2, "María", "García López", "maria.garcia@email.com"),
    3 -> Alumno(3, "Carlos", "Rodríguez Martín", "carlos.rodriguez@email.com"),
    4 -> Alumno(4, "Ana", "Fernández Ruiz", "ana.fernandez@email.com"),
    5 -> Alumno(5, "Luis", "Martínez Torres", "luis.martinez@email.com")
  )
  
  idCounter.set(alumnos.keys.max + 1)
  
  def findAll(): List[Alumno] = alumnos.values.toList.sortBy(_.id)
  
  def findById(id: Int): Option[Alumno] = alumnos.get(id)
  
  def findByNombre(nombre: String): List[Alumno] = 
    alumnos.values.filter(_.nombre.toLowerCase.contains(nombre.toLowerCase)).toList
  
  def create(nombre: String, apellidos: String, correo: String): Alumno = {
    val id = idCounter.getAndIncrement()
    val alumno = Alumno(id, nombre, apellidos, correo)
    alumnos += (id -> alumno)
    alumno
  }
  
  def update(id: Int, nombre: String, apellidos: String, correo: String): Option[Alumno] = {
    if (alumnos.contains(id)) {
      val alumno = Alumno(id, nombre, apellidos, correo)
      alumnos += (id -> alumno)
      Some(alumno)
    } else {
      None
    }
  }
  
  def delete(id: Int): Boolean = {
    alumnos.remove(id).isDefined
  }
}