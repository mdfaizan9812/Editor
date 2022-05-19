const mongoose = require('mongoose');

// creating schema
const resetPasswordSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    OTP: {
        type: String,
        unique: true,
        required: true
    },
    code:{
        type: String,
        unique: true,
    },
    createdAt: { type: Date, expires: '10m', default: Date.now }
},
{
    timestamps:true
});



// user model
const resetPasswordModel = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = resetPasswordModel;