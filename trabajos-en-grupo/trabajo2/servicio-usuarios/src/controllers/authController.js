const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        message: "Correo y contraseña son requeridos",
      });
    }

    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Credenciales inválidas",
      });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login exitoso",
      token,
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
      message: "Error en el login",
      error: error.message,
    });
  }
};

exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json({
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
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.json({
      message: "Sesión cerrada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al cerrar sesión",
      error: error.message,
    });
  }
};
