const mongoose = require('mongoose');
const multer  = require('multer');
const path = require('path');
const USER_FILE_PATH = path.join('/uploads');

// creating schema
const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userImage:{
        type:String
    }
},
{
    timestamps:true
});

// storing files into disk
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',USER_FILE_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
userSchema.statics.uploadUserImage = multer({ storage: storage }).single('userImage');
userSchema.statics.userFilePath = USER_FILE_PATH;

// user model
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;