const express = require("express");
const router = express.Router();

const trabajdorRouter = require("./trabajdorRouter");

router.use("/trabajador", trabajdorRouter);

module.exports = router;
