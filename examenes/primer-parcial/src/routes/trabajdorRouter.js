const express = require("express");
const router = express.Router();
const trabajadorController = require("../controllers/TrabajadorController");

router.get("/", trabajadorController.getAll);
router.post("/", trabajadorController.create);
router.put("/:id", trabajadorController.update);
router.delete("/:id", trabajadorController.delete);

module.exports = router;
