require("dotenv").config();
const express = require("express");

const connection = require("./config/database");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("API de Tareas con MySQL y TypeORM");
});

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });
