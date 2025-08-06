const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const AgendaController = require("./controller/AgendaController");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

await AgendaController.init();

app.get("/", AgendaController.index);
app.get("/crear", AgendaController.create);
app.post("/crear", AgendaController.store);
app.get("/editar/:id", AgendaController.edit);
app.post("/editar/:id", AgendaController.update);
app.post("/eliminar/:id", AgendaController.destroy);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
