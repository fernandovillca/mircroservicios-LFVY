const Trabajdor = require("../models/Trabajador");

exports.getAll = async (req, res) => {
  try {
    const trabajadores = await Trabajdor.find();
    res.json(trabajadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newTrabajdor = new Trabajdor(req.body);
    const saved = await newTrabajdor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedTrabajador = await Trabajdor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTrabajador) {
      return res.status(404).json({ error: "Trabajador no encontrado" });
    }

    res.json(updatedTrabajador);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedTrabajador = await Trabajdor.findByIdAndDelete(req.params.id);

    if (!deletedTrabajador) {
      return res.status(404).json({ error: "Trabajdor no encontrado" });
    }

    res.json({ message: "Trabajador eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
