const express = require("express");
const router = express.Router();

const verificationToken = require("../middlewares/verificationToken");

const { register, getAllUsers } = require("../controllers/userController");

router.post("/", register);
router.get("/", verificationToken, getAllUsers);

module.exports = router;
