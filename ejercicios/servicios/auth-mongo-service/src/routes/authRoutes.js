const express = require("express");
const router = express.Router();
const verificationToken = require("../middlewares/verificationToken");
const { login, logout, getAuthUser } = require("../controllers/authController");

router.post("/login", login);

router.get("/me", verificationToken, getAuthUser);
router.post("/logout", verificationToken, logout);

module.exports = router;
