const generateLinkController = require("../controllers/generateLinkController.js");
const userAuth = require("../middlewares/isAuthenticate.js");

const express = require("express");
const router = express.Router();

router.get("/link",  userAuth.authenticated,  generateLinkController.getlink);
router.get("/check", generateLinkController.checkCredentialforEditor);

module.exports = router;