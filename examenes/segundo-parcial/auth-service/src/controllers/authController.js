const { getRepository } = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../entities/User");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const repo = getRepository(User);

    const existente = await repo.findOne({ where: { correo } });
    if (existente) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = repo.create({
      correo,
      password: hashedPassword,
    });

    const resultado = await repo.save(nuevoUsuario);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const repo = getRepository(User);

    const usuario = await repo.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

module.exports = { register, login };
