const jwt = require("jsonwebtoken");

const verificationToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token no proporcionado o inválido" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token inválido o expirado" });
      }

      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al verificar el token", error: error.message });
  }
};

module.exports = verificationToken;
