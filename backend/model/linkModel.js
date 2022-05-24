const mongoose = require('mongoose');

// creating schema
const linkSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: { type: Date, expires: 60*60*24, default: Date.now }
},
{
    timestamps:true
});



// user model
const linkModel = mongoose.model('link', linkSchema);

module.exports = linkModel;