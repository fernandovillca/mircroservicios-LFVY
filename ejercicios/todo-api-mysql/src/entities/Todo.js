const { EntitySchema } = require("typeorm");

module.exports.Todo = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
      generationStrategy: "increment",
    },
    title: {
      type: String,
      length: 100,
    },
    description: {
      type: String,
      length: 100,
    },
  },
});
