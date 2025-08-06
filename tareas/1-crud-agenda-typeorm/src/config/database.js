const { DataSource } = require("typeorm");
const Agenda = require("../entities/Agenda");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "db_microservicios",
  synchronize: true,
  logging: false,
  entities: [Agenda],
});

module.exports = AppDataSource;
