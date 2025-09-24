const express = require("express");
const router = express.Router();
const todoController = require("../controllers/TodoController");

// // Ruta para obtener todos los items
// router.get("/", todoController.getAllTodos);

// // Ruta para crear un nuevo item
// router.post("/", todoController.createTodo);

// // Rutas para un item específico (por ID)
// // GET /items/:id
// // PUT /items/:id
// // DELETE /items/:id
// router.get("/:id", todoController.getTodoById);
// router.put("/:id", todoController.updateTodo);
// router.delete("/:id", todoController.deleteTodo);

// RUTAS DOCUEMTADAS CON SWAGGER

// Ruta para obtener todos los items

/**
 * @swagger
 * /todo:
 *   get:
 *     tags:
 *       - Tareas
 *     summary: Obtener todos las tareas
 *     description: Retorna una lista de tareas
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida
 */

router.get("/", todoController.getAllTodos);

// Ruta para crear un nuevo item

/**
 * @swagger
 * /todo:
 *   post:
 *     tags:
 *       - Tareas
 *     summary: Crear una tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post("/", todoController.createTodo);

// Rutas para un item específico (por ID)
// GET /items/:id
// PUT /items/:id
// DELETE /items/:id
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
