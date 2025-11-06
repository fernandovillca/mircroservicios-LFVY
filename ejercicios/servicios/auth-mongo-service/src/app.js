const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();

// Conexión a la base de datos
// const mongoUri = "mongodb://mongo:27017/servicio_usuarios_test";

const mongoUri = "mongodb://db-auth-mongo:27017/servicio_usuarios_test";
mongoose
  .connect(mongoUri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// Inicializar app
const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/", routes);

// Ruta base para verificar estado del servidor
// app.get("/", (req, res) => {
//   res.json({ message: "🚀 API de Usuarios funcionando correctamente" });
// });

// Puerto desde .env o por defecto
const PORT = process.env.PORT || 3000;

// Levantar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
