const notepad=$("#notepad"),language=$(".code_block select"),editorTextarea=$("#editor_textarea"),inputBox=$(".input textarea"),outputBox=$(".output div"),run=$("#run"),clear=$("#clear");import{runEditorCode}from"./editor.js";const socket=io.connect("http://localhost:8000/users/editors?");let params=new URL(document.location).searchParams,room=params.get("room"),id=params.get("id");socket.emit("joinRoom",{room:room,id:id}),notepad.keyup(function(){socket.emit("notepadText",{text:notepad.val(),room:room})}),socket.on("othersNotepad",function(o){notepad.val(o)}),language.click(function(){socket.emit("language",{text:language.val(),room:room})}),socket.on("othersLanguage",function(o){language.val(o)}),editorTextarea.keyup(function(){socket.emit("editorTextarea",{text:editorTextarea.val(),room:room})}),socket.on("othersEditorTextarea",function(o){editorTextarea.val(o)}),inputBox.keyup(function(){socket.emit("inputBox",{text:inputBox.val(),room:room})}),socket.on("othersInputBox",function(o){inputBox.val(o)}),run.click(async function(){var o=await runEditorCode();socket.emit("outputBox",{text:o,room:room})}),socket.on("othersOutputBox",function(o){outputBox.text(o)}),clear.click(function(){socket.emit("clear",{text:"",room:room})}),socket.on("othersClear",function(o){outputBox.text(o),inputBox.val(o)});