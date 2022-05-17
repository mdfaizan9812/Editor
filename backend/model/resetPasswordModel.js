const mongoose = require('mongoose');

// creating schema
const resetPasswordSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: { type: Date, expires: '2m', default: Date.now }
},
{
    timestamps:true
});



// user model
const resetPasswordModel = mongoose.model('resetPassword', resetPasswordSchema);

module.exports = resetPasswordModel;