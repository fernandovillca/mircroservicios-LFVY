const Todo = require("../models/Todo");

// Lógica para crear un nuevo Todo
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lógica para obtener todos los Todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lógica para obtener un item por su ID
exports.getTodoById = async (req, res) => {
  try {
    // Busca el item usando el ID de los parámetros de la URL
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      // Si el todo no se encuentra, devuelve un error 404
      return res.status(404).json({ error: "Todo no encontrado" });
    }

    // Si se encuentra, devuelve el todo
    res.json(todo);
  } catch (err) {
    // Si hay un error de servidor o de formato de ID, devuelve 500
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Lógica para actualizar un todo por su ID
exports.updateTodo = async (req, res) => {
  try {
    // Busca y actualiza el todo. `{ new: true }` devuelve el documento actualizado.
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // `runValidators` valida los datos de la actualización
    );

    if (!updatedTodo) {
      // Si el todo no se encuentra, devuelve un error 404
      return res.status(404).json({ error: "Todo no encontrado" });
    }

    // Si se actualiza con éxito, devuelve el documento actualizado
    res.json(updatedTodo);
  } catch (err) {
    // Si hay un error de validación o del servidor, devuelve 400 o 500
    res.status(400).json({ error: err.message });
  }
};

// Lógica para eliminar un item por su ID
exports.deleteTodo = async (req, res) => {
  try {
    // Busca y elimina el todo
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      // Si el todo no se encuentra, devuelve un error 404
      return res.status(404).json({ error: "Todo no encontrado" });
    }

    // Si se elimina con éxito, devuelve un mensaje de confirmación
    res.json({ message: "Todo eliminado correctamente" });
  } catch (err) {
    // Si hay un error de servidor, devuelve 500
    res.status(500).json({ error: "Error del servidor" });
  }
};
