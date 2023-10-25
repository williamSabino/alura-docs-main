const socket = io();

const editor = document.getElementById('editor-texto');

editor.addEventListener('keyup', ()=>{
    socket.emit("editor_Texto", editor.value);
});

socket.on("editor_Texto_servidor", (texto)=>{
    editor.value = texto;
});