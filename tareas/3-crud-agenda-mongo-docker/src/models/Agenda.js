const mongoose = require("mongoose");

const AgendaSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: true,
  },
  direccion: {
    type: String,
  },
  celular: {
    type: String,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Agenda", AgendaSchema, "agenda");
