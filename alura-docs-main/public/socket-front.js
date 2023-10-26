import { textAreaText } from "./documento.js";

const socket = io();


socket.on("editor_Texto_servidor", (texto)=>{
    textAreaText(texto);
});

function editorTexto(dados){
    socket.emit("editor_Texto", dados);
}

function selectDocument(documento){
    socket.emit("select_document", documento);
}

export {editorTexto, selectDocument};