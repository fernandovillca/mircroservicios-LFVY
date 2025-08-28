## Levantar la aplicacion

```bash
docker-compose up --build
```

## Borrar el volumen

```bash
docker-compose down -v
```

## Ingresar al contenedor mysql (para crear la tabla)

```bash
docker exec -it <nombre_contenedor_mysql> mysql -u root -p
# ejemplo
docker exec -it ejercicio2-mysql-1 mysql -u root -p
# Luego ingresar la contrasenia se se tiene
```

## Ver el contenedor

```bash
docker ps
```

## Una ves ingresado al mysql:

```bash
# Seleccionar base de datos
USE db_usuarios;

# Ver tablas
SHOW TABLES;

# Crear tabla usuarios si no existe (no debe tener saltos de linea)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Ver estructura de la tabla
DESCRIBE usuarios;

# Hacer consultas
SELECT * FROM usuarios;
```
