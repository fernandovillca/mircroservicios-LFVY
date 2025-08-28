const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "mysql", //host.docker.internal
  port: 3306,
  user: "root",
  password: "123456",
  database: "db_usuarios",
});

module.exports = pool.promise();
