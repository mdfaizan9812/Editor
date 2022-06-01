const compileController = require("../controllers/compileController");
const express = require("express");
const router = express.Router();

router.post("/run", compileController.compile);

module.exports = router;
