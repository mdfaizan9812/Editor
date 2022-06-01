"use strict";
const User = require("../model/userModel.js");
const ResetPassword = require("../model/resetPasswordModel.js");
const hashPassword = require("../bcripted/password.js");
const resetMailer = require("../mailers/reset_mailer.js");
const { v4: uuid } = require("uuid");

// send email for reset password
module.exports.sendEmailToResetPassword = async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user){
        return res.status(400).json({
          success: "fail",
          message: "You are not registered user",
        });
      }
      // Create random 4 digit for OTP
      let OTP = Math.floor(Math.random(4) * 9000 + 1000);
      // Check OTP exist(may be user request for OTP more than one within 10 minutes.)
      let checkOTPExist = await ResetPassword.findOne({email: req.body.email});
      if(checkOTPExist){
        checkOTPExist.OTP = OTP;
        checkOTPExist.save();
      }
      else{
        await ResetPassword.create({
          email: req.body.email,
          OTP: OTP,
        });
      }
      // send mail
      resetMailer.resetPassword(
        OTP,
        req.body.email
      );
  
      return res.status(200).json({
        success: "pass",
        message: "Has been mailed to reset password",
      });
      
    } catch (error) {
      return res.status(400).json({
        success: "fail",
        message: error,
      });
    }
  };
  
  module.exports.check_OTP = async (req,res) => {
    try {
      const OTP = req.body.OTP;
      const email = req.body.email;
      const code = uuid();
      
      if(!OTP || !email){
        return res.status(400).json({
          success: 'fail',
          message: 'Wrong OTP and email'
        });
      }
  
      let checkOTP = await ResetPassword.findOne({email: email, OTP: OTP});
      if(checkOTP){
        checkOTP.code = code;
        checkOTP.save();
  
        return res.status(200).json({
          success: 'pass',
          code: code,
          message: 'Ok OTP'
        });
      }
      return res.status(400).json({
        success: 'fail',
        message: 'Wrong OTP'
      });
      
    } catch (error) {
      return res.status(500).json({
        success: 'fail',
        message: 'Server error'
      });
    }
  }
  
  // after getting form data which is filled by user in the registered email
  module.exports.forgetPassword = async (req, res) => {
    try {
      let code = req.params.id;
      let password = req.body.password;
      let cPassword = req.body.cPassword;
      if (password !== cPassword) {
        return res.status(400).json({
          success: "fail",
          message: "Password matching failed",
        });
      }
      let checkResetPassword = await ResetPassword.findOne({
        code: code,
      });
      if (checkResetPassword) {
        let user = await User.findOne({ email: checkResetPassword.email });
        let changedPassword = await hashPassword.bcryptPassword(password);
        user.password = changedPassword;
        user.save();
        return res.status(200).json({
            success:'pass',
            message: 'Password has been changed'
        });
      } else {
        return res.status(401).json({
            success:'fail',
            message: 'Unauthorized'
        })
      }
      
    } catch (error) {
      return res.status(400).json({
        success: "fail",
        message: error,
      });
    }
  };
  
  