const express = require("express");
const database = require("./config/database");
const Tarea = require("./models/Tarea");

const app = express();
const PORT = 3000;

app.use(express.json());
database();

app.get("/", (req, res) => {
  // mostrar un html con los enlaces
  res.send(`
    <h1>API de Tareas</h1>
    <pre>
        <code>
            GET /tareas
            GET /tareas/:id
            POST /tareas
            PUT /tareas/:id
            DELETE /tareas/:id
        </code>
    </pre>
  `);
});

app.get("/tareas", async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

app.get("/tareas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tarea = await Tarea.findById(id);
    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
});

app.post("/tareas", async (req, res) => {
  const { titulo, descripcion, estado, fechaCreacion } = req.body;
  try {
    const nuevaTarea = new Tarea({
      titulo,
      descripcion,
      estado,
      fechaCreacion,
    });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

app.put("/tareas/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado, fechaCreacion } = req.body;
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { titulo, descripcion, estado, fechaCreacion },
      { new: true }
    );
    if (!tareaActualizada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(tareaActualizada);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

app.delete("/tareas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(id);
    if (!tareaEliminada) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
