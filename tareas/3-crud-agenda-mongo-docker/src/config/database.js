const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      // Usar variable de entorno si está disponible, sino usar la configuración por defecto
      const mongoUri =
        process.env.MONGODB_URI ||
        "mongodb://admin:admin@localhost:27017/db_microservicios?authSource=admin";

      // Configuración mejorada para Docker
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
        maxPoolSize: 10, // Mantener hasta 10 conexiones
        bufferCommands: false, // Deshabilitar buffering de comandos
      });

      console.log("✅ Conectado a MongoDB");
      console.log("🔗 URI:", mongoUri.replace(/\/\/.*@/, "//***:***@")); // Ocultar credenciales en log

      // Eventos de conexión
      mongoose.connection.on("error", (err) => {
        console.error("❌ Error de MongoDB:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.log("⚠️ MongoDB desconectado");
      });

      mongoose.connection.on("reconnected", () => {
        console.log("🔄 MongoDB reconectado");
      });
    } catch (error) {
      console.error("❌ Error de conexión a MongoDB:", error);
      // Reintentar conexión después de 5 segundos
      setTimeout(() => {
        console.log("🔄 Reintentando conexión a MongoDB...");
        this.connect();
      }, 5000);
    }
  }

  // Método para verificar si está conectado
  isConnected() {
    return mongoose.connection.readyState === 1;
  }
}

module.exports = new Database();
