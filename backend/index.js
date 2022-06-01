// configure dotenv file
require('dotenv').config();

// import modules
const express = require('express');
const db = require('./config/db.js');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const socketServer = require('./socket/serverSocket.js')
// const cookieParser = require("cookie-parser");
var cors = require('cors');



// port number at which server is running
const port = process.env.PORT
// express app
const app = express();

// connecting database
db();

// Cross-Origin Resource Sharing
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads',express.static(__dirname + '/uploads'))




// ENDPOINT

app.use('/api/v1',require('./routes/index.js'));

// server listening
const server = app.listen(port,(err)=>{
    if(err){
        console.log(`Error in server listening :-${err}`);
        return;
    }
    console.log(`Server listening at http://localhost:${port}`)
});


// socket server
const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });
socketServer.socketServerFunction(io);


