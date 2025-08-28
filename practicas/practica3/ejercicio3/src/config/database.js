const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://mongo:27017/db_tareas", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error de conexión a MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
