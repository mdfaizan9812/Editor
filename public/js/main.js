const notepad = $('#notepad');
const language = $('.code_block select');
const editorTextarea = $('#editor_textarea');
const inputBox = $('.input textarea');
const outputBox = $('.output div')
const run = $('#run');
const clear = $('#clear');
import { runEditorCode } from "./editor.js";

const socket = io.connect("http://localhost:8000/users/editors?");

//getting query params from the address-bar (client-side)
let params = (new URL(document.location)).searchParams;

//getting unique params by their name
let room = params.get('room');
let id = params.get('id');

// event fired for join room
socket.emit('joinRoom',{room,id});

// event fired when working on sample notepad
notepad.keyup(function(){
    socket.emit('notepadText',{text:notepad.val(), room: room})
});

socket.on('othersNotepad',function(data){
    notepad.val(data)
});

// event fired when working on editor block
language.click(function(){
    socket.emit('language', {text:language.val(), room: room});
})

socket.on('othersLanguage',function(data){
    language.val(data)
});


// event fired when working on editor textarea
editorTextarea.keyup(function(){
    socket.emit('editorTextarea',{text:editorTextarea.val(), room: room})
});

socket.on('othersEditorTextarea',function(data){
    editorTextarea.val(data)
});

// event fired when working on input box
inputBox.keyup(function(){
    socket.emit('inputBox',{text:inputBox.val(), room: room})
});

socket.on('othersInputBox',function(data){
    inputBox.val(data)
});

// event fired when working on output box
run.click(async function(){
    let val =  await runEditorCode();
    socket.emit('outputBox',{text:val, room: room});
});

socket.on('othersOutputBox',function(data){
    outputBox.text(data);
});

// event fired when working on clear input and output
clear.click(function(){
    socket.emit('clear',{text:"", room: room});
});

socket.on('othersClear',function(data){
    outputBox.text(data);
    inputBox.val(data);
});