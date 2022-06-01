const forgetController = require("../controllers/forgetController");
const express = require("express");
const router = express.Router();

router.post("/mail", forgetController.sendEmailToResetPassword);
router.post("/reset/:id", forgetController.forgetPassword);
router.post("/otp", forgetController.check_OTP);

module.exports = router;
