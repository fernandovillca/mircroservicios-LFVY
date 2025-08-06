const mysql = require("mysql2");

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "db_microservicios",
    });

    this.connect();
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error("Error al conectar:", err.message);
        return;
      }
      console.log("Conexión establecida");
    });
  }

  getConnection() {
    return this.connection.promise();
  }
}

module.exports = new Database();
