const express = require("express");
const router = express.Router();

router.use('/users',require('./users.js'));
router.use('/compile',require('./compiles.js'));
router.use('/generate',require('./generates.js'));
router.use('/forget',require('./forgets.js'));

module.exports = router;
