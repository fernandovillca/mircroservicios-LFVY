const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(
        "mongodb://admin:admin@localhost:27017/db_microservicios?authSource=admin",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          authSource: "admin",
        }
      );
      console.log("Conectado a MongoDB");
    } catch (error) {
      console.error("Error de conexión a MongoDB:", error);
    }
  }
}

module.exports = new Database();
