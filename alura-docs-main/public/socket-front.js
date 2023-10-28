import { alertareRedirecionar, textAreaText } from "./documento.js";

const socket = io();


socket.on("editor_Texto_servidor", (texto) => {
    textAreaText(texto);
});

function editorTexto(dados) {
    socket.emit("editor_Texto", dados);
}

function selectDocument(documento) {
    socket.emit("select_document", documento, (document)=>{
        textAreaText(document);
    });
}

function excluirDocumento(documento){
    socket.emit("excluir_Documento", documento);
}

socket.on('excluir_Documento_sucesso', (documento) => {
    alertareRedirecionar(documento);
});

export { editorTexto, selectDocument, excluirDocumento };