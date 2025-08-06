const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const AgendaController = require("./controllers/AgendaController");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("layout", "layout");

app.get("/", AgendaController.index);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
