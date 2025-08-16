const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("./config/database");

const AgendaController = require("./controllers/AgendaController");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

app.get("/", AgendaController.index);
app.get("/crear", AgendaController.create);
app.post("/crear", AgendaController.store);
app.get("/editar/:id", AgendaController.edit);
app.post("/editar/:id", AgendaController.update);
app.post("/eliminar/:id", AgendaController.destroy);

app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
