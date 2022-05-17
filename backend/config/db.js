const mongoose = require('mongoose');

const DB_OPTIONS = {
    dbName: process.env.DB_NAME
}

const connectdb = ()=>{
    // connecting with database
    return mongoose.connect(process.env.DATABAE_URL,DB_OPTIONS,()=>{
        console.log("Database connected successfully");
    })
}

module.exports = connectdb;