const userController = require("../controllers/userCotroller.js");
const userAuth = require("../middlewares/isAuthenticate.js");
const { limiter } = require("./../middlewares/ratelimiter.js");

const express = require("express");
const router = express.Router();

router.get("/profile", userAuth.authenticated, userController.profile);
router.post("/signup", userController.create);
router.post("/login", limiter, userController.login);
router.post("/refresh", userController.newToken);
router.post("/reset", userAuth.authenticated, userController.editPassword);
router.delete("/del/:id", userAuth.authenticated, userController.destroy);
router.put("/update/:id", userAuth.authenticated, userController.update);

module.exports = router;
