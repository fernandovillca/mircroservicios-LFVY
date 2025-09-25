const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const port = 3000;

// const mongoUri = "mongodb://localhost:27017/examen";
const mongoUri = "mongodb://mongo:27017/examen";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
