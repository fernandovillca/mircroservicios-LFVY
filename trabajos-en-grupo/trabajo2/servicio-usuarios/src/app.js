const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const routes = require("./routes");
// const cors = require("cors");

dotenv.config();

// Conexión a la base de datos
connectDB();

// Inicializar app
const app = express();

// Middlewares globales
// app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api", routes);

// Ruta base para verificar estado del servidor
app.get("/", (req, res) => {
  res.json({ message: "🚀 API de Usuarios funcionando correctamente" });
});

// Puerto desde .env o por defecto
const PORT = process.env.PORT || 4000;

// Levantar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
