// configure dotenv file
require('dotenv').config();

// import modules
const express = require('express');
const frontend = require('./controllers/frontend.js');
const cookieParser = require("cookie-parser");



// port number at which server is running
const port = process.env.PORT
// express app
const app = express();



app.use(express.static('public'));


app.use(cookieParser());



// ENDPOINT
app.get('/',frontend.home);
app.use('/users',require('./routes/index.js'));

// server listening
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in server listening :-${err}`);
        return;
    }
    console.log(`Server listening at http://localhost:${port}`)
});



