require("dotenv").config();
const express = require("express");

const connection = require("./config/database");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

connection()
  .then(() => {
    app.use("/api", routes);

    app.get("/", (req, res) => {
      res.send("API de Usuarios con MySQL y TypeORM");
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });
