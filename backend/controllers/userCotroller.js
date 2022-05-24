"use strict";
const User = require("../model/userModel.js");
const ResetPassword = require("../model/resetPasswordModel.js");
const {
  user_schema,
  user_login_schema,
} = require("../model/validate/userValidate.js");
const hashPassword = require("../bcripted/password.js");
const tokenGenerate = require("../bcripted/tokenGenerate.js");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const resetMailer = require("../mailers/reset_mailer.js");
const { v4: uuid } = require("uuid");



// creating a new user
module.exports.create = async (req, res) => {
  try {
    // check validation of coming data
    const value = await user_schema.validateAsync(req.body);

    // bcrypt the password
    let bcryptedPassword = await hashPassword.bcryptPassword(req.body.password);

    // storing data into database
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcryptedPassword,
    }); // once created do response

    return res.status(201).json({
      data: {
        username: user.username,
        email: user.email,
      },
      message: "You have registered",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(422);
      error = error.message;
    }
    // if validation is fine but user exist
    if (error.name === "MongoServerError" || error.keyValue) {
      res.status(403);
      error = "User already exist";
    }

    return res.json({
      message: error,
    });
  }
};

// delete a existing user
module.exports.destroy = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user && req.user === user.id) {
      user.remove();
      return res.status(200).json({
        message: `${user.email} user deleted`,
      });
    } else {
      throw "You can not delete others profile";
    }
  } catch (err) {
    return res.json({
      message: "You are not registered user",
    });
  }
};

// update information of an user
module.exports.update = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    // checking user update oun profile
    if (user && req.user === user.id) {
      User.uploadUserImage(req, res, async function (err) {
        try {
          if (err) {
            throw "Error in uploading file";
          }

          // change::
          if (req.body.username) {
            user.username = req.body.username;
          }

          // if file is uploaded by user
          if (req.file) {
            // if file exist in uploads folder then delete that and add new one
            if (
              user.userImage &&
              fs.existsSync(path.join(__dirname, "..", user.userImage))
            ) {
              fs.unlinkSync(path.join(__dirname, "..", user.userImage));
            }
            user.userImage = User.userFilePath + "/" + req.file.filename;
          }
          user.save();
          return res.status(200).json({
            data: {
              userImage: user.userImage,
            },
            message: `${user.email} user updated`,
          });
        } catch (err) {
          // if get a joi validation err
          if (err.name === "ValidationError") {
            res.status(422);
            err = err.message;
          }

          return res.json({
            message: err,
          });
        }
      });
    } else {
      throw "You can not update others profile";
    }
  } catch (err) {
    return res.status(401).json({
      message: err,
    });
  }
};

// login form
module.exports.login = async (req, res) => {
  try {
    // check validation of coming data
    const value = await user_login_schema.validateAsync(req.body);

    // get details of a user
    const user = await User.findOne({ email: req.body.email });

    // if user is signedUp
    if (user) {
      // check password
      let matchPassword = await hashPassword.compareHashPassword(
        req.body.password,
        user.password
      );
      if (matchPassword) {
        // generate token
        let { access_token, refresh_token } =
          await tokenGenerate.generatedToken(user._id);

        // return information
        return res.status(200).json({
          data: {
            access_token,
            refresh_token,
          },
          message: "Token Generated",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Email/Password is wrong",
        });
      }
    }
    // if user is not signedup
    else {
      return res.status(400).json({
        success: false,
        message: "You are not registered user",
      });
    }
  } catch (err) {
    // if get a joi validation err
    if (err.details) {
      res.status(422);
      err = err.details[0].message;
    }

    return res.json({
      message: err,
    });
  }
};

module.exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.user, {
      _id: 1,
      username: 1,
      email: 1,
      userImage: 1,
    });
    res.status(200).json(user);
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

// generate new access and refresh token using older refresh token
module.exports.newToken = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      throw "Not authorized";
    }
    const payload = await jwt.verify(
      refreshToken,
      process.env.REFRESH_SEKRET_KEY
    );

    // generate token
    let { access_token, refresh_token } = await tokenGenerate.generatedToken(
      payload.data
    );

    // return information
    return res.status(200).json({
      data: {
        access_token,
        refresh_token,
      },
      message: "Token Generated",
    });
  } catch (err) {
    return res.status(401).json({
      message: err,
    });
  }
};

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

// edit password
module.exports.editPassword = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let cPassword = req.body.cPassword;
    if (password === cPassword) {
      let user = await User.findOne({ email: email });
      let changedPassword = await hashPassword.bcryptPassword(password);
      user.password = changedPassword;
      user.save();
      return res.status(200).json({
        success: "pass",
        message: "Password has been changed",
      });
    } else {
      return res.status(400).json({
        success: "fail",
        message: "Enter valid password",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: "fail",
      message: 'error',
    });
  }
};

