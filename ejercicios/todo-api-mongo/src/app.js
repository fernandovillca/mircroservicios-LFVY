const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3000;

// CONFIGURACION de la conexión a MongoDB.
// El nombre del host 'mongo' coincide con el nombre del servicio en docker-compose.yml.
// const mongoUri = "mongodb://localhost:27017/apis_db"; // para la conexion local
const mongoUri = "mongodb://mongo:27017/apis_db"; // para la conexion mediante docker

// Conexión a MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// DOCUMENTACION
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST DE TAREAS",
      version: "1.0.0",
      description: "Documentación de la API REST",
    },
    tags: [{ name: "Tareas", description: "Gestión de tareas" }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware para parsear JSON
app.use(express.json());

// Usamos las rutas de todos
app.use("/", routes);

// Ruta para la documentación
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta principal
// app.get("/", (req, res) => {
//   res.send("API Node.js funcionando correctamente 🎉");
// });

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
