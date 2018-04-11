const express = require("express");
const router = express.Router();

const logController = require("../controllers/logs");

router.get("/", logController.getAll);
router.get("/:id", logController.getById);

module.exports = router;
