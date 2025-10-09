const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { nombre, apellidos, correo, password, rol } = req.body;

    if (!nombre || !apellidos || !correo || !password) {
      return res.status(400).json({
        message: "Todos los campos son requeridos",
      });
    }

    const userExists = await User.findOne({ correo });
    if (userExists) {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

    const user = await User.create({
      nombre,
      apellidos,
      correo,
      password,
      rol: rol || "user",
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: user._id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
        rol: user.rol,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar usuario",
      error: error.message,
    });
  }
};
