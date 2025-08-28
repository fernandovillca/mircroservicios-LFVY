const express = require("express");

const app = express();
const PORT = 8080;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/calcular", (req, res) => {
  const { numero1, numero2, operacion } = req.body;

  console.log("DATOS: ", { numero1, numero2, operacion });
  let resultado;

  switch (operacion) {
    case "sumar":
      resultado = parseFloat(numero1) + parseFloat(numero2);
      break;
    case "restar":
      resultado = parseFloat(numero1) - parseFloat(numero2);
      break;
    case "multiplicar":
      resultado = parseFloat(numero1) * parseFloat(numero2);
      break;
    case "dividir":
      resultado = parseFloat(numero1) / parseFloat(numero2);
      break;
    default:
      resultado = "Operación no válida";
  }

  res.send(
    `El resultado de ${operacion} ${numero1} y ${numero2} es: ${resultado} </br>
    <a href="/">Volver</a>`
  );
});

app.listen(PORT, () => {
  console.log(`aplicacion corriendo en: http://localhost:${PORT}`);
});
