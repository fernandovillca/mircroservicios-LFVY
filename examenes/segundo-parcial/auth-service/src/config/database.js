const { createConnection } = require("typeorm");
const mysql = require("mysql2/promise");
const { User } = require("../entities/User");

const connection = async () => {
  try {
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    await tempConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );
    console.log(`Base de datos '${process.env.DB_NAME}' creada.`);

    await tempConnection.end();

    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + "/../entities/*.js"],
      synchronize: true,
    });
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connection;
