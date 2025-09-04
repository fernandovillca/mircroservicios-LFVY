require("reflect-metadata");
const { DataSource } = require("typeorm");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const Mesa = require("./entity/Mesa");
const Padron = require("./entity/Padron");

// Exportamos la instancia directamente
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "admin",
  database: "graphql_practica",
  synchronize: true,
  logging: false,
  entities: [Mesa, Padron],
});

async function startServer() {
  try {
    // 1️⃣ Inicializar la BD primero
    await AppDataSource.initialize();
    console.log("✅ Conectado a la base de datos");

    // 2️⃣ Configurar Express
    const app = express();

    // 3️⃣ Apollo
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    // 4️⃣ Arrancar servidor
    app.listen(4000, () => {
      console.log(
        `🚀 Servidor listo en http://localhost:4000${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("❌ Error al iniciar servidor:", error);
  }
}

// 👀 Exportamos la misma instancia, no un objeto
module.exports = AppDataSource;

startServer();
