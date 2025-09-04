require("dotenv").config();
const express = require("express");
const connection = require("./config/database");

const PORT = process.env.PORT || 3001;

const app = express();

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });
