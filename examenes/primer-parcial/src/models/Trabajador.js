const mongoose = require("mongoose");

const trabajadorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  ci: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  },
  fecha_ingreso: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Trabajador", trabajadorSchema);
