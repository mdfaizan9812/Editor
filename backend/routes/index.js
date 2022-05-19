const userController = require('../controllers/userCotroller.js');
const generateLinkController = require('../controllers/generateLinkController.js');
const compileController = require('../controllers/compileController');
const userAuth = require('../middlewares/isAuthenticate.js')
const express = require('express');
const router = express.Router();


router.post('/signup',userController.create);
router.post('/login',userController.login);
router.post('/refresh_token',userController.newToken);
router.post('/run',compileController.compile);
router.post('/forget',userController.sendEmailToResetPassword);
router.post('/resetPassword/:id',userController.forgetPassword);
router.post('/otp',userController.check_OTP);

router.delete('/delete/:id',userAuth.authenticated,userController.destroy);
router.post('/update/:id',userAuth.authenticated,userController.update);
router.post('/editPassword',userAuth.authenticated,userController.editPassword);

router.get('/profile',userAuth.authenticated,userController.profile);

router.get('/getlinkFromServer',userAuth.authenticated,generateLinkController.getlink);
router.get('/editor?',generateLinkController.checkCredentialforEditor);


module.exports = router;