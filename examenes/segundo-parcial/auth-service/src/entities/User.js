const { EntitySchema } = require("typeorm");

module.exports.User = new EntitySchema({
  name: "User",
  tableName: "usuarios",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      generationStrategy: "increment",
    },
    correo: {
      type: String,
      length: 100,
      unique: true,
    },
    password: {
      type: String,
      length: 100,
    },
  },
});
