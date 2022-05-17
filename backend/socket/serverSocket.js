module.exports.socketServerFunction = (io) => {
    io.of('/users/editors').on('connect',(socket) => {
        console.log(socket.id);
    
        socket.on('joinRoom', function(data) {
            const {room,id} = data;
            
            //join the room with unique room name
            socket.join(room);
        });
    
        socket.on('notepadText',function(data){
            socket.broadcast.to(data.room).emit('othersNotepad',data.text);
        });

        socket.on('language',function(data){
            socket.broadcast.to(data.room).emit('othersLanguage',data.text);
        });

        socket.on('editorTextarea',function(data){
            socket.broadcast.to(data.room).emit('othersEditorTextarea',data.text);
        });

        socket.on('inputBox',function(data){
            socket.broadcast.to(data.room).emit('othersInputBox',data.text);
        });

        socket.on('outputBox',function(data){
            io.of('/users/editors').to(data.room).emit('othersOutputBox',data.text);
        });

        socket.on('clear',function(data){
            io.of('/users/editors').to(data.room).emit('othersClear',data.text);
        });
    });
}