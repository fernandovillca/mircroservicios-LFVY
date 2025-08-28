const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const database = require("./config/database");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const [rows] = await database.query("SELECT * FROM usuarios");
    // console.log({ usuarios: rows });
    res.render("index", { usuarios: rows });
    // res.send("Hola Mundo");
  } catch (err) {
    res.status(500).send("Error al obtener usuarios: " + err.message);
  }
});

app.get("/formulario", (req, res) => {
  res.render("formulario");
});

app.post("/agregar", async (req, res) => {
  const { nombre, correo, fecha_registro } = req.body;
  try {
    await database.query(
      "INSERT INTO usuarios (nombre, correo, fecha_registro) VALUES (?, ?, ?)",
      [nombre, correo, fecha_registro]
    );
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error al agregar usuario: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
