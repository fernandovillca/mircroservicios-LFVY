const mongoose = require("mongoose");

// Definimos el esquema para los Todos
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

// Creamos y exportamos el modelo
module.exports = mongoose.model("Todo", todoSchema);
