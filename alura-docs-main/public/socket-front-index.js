import { inserirLinha, removerLinha } from "./index.js";

const socket = io();
socket.emit('pegar_documentos', (documentos) => {
    documentos.forEach((document) => {
        inserirLinha(document.nome);
    });
});

function inserirDocumento(documento) {
    socket.emit('inserirDocumento', documento);
}

socket.on('inserir_Documento_interface', (documento) => {
    inserirLinha(documento);
});

socket.on('documento_existente', (documento) => {
    alert(`O documento ${documento} Já existe`);
});

socket.on("excluir_Documento_sucesso", (documento) => {
    removerLinha(documento);
});


export { inserirDocumento };