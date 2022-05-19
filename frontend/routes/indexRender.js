const frontend = require('../controllers/frontend.js');
const express = require('express');
const router = express.Router();




router.get('/signup',frontend.signup);
router.get('/login',frontend.signin);
router.get('/link',frontend.linkGenerator);

router.get('/?',frontend.getEditor);
router.get('/forget',frontend.forget);
router.get('/set/:id',frontend.resetPassword);



module.exports = router;