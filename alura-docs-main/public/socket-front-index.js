import { inserirLinha, removerLinha } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

const socket = io("/usuarios",{
    auth:{
        token: obterCookie("jwtToken"),
    }
});

socket.on("connect_error",(err)=>{
    alert(err);
    window.location.href = '/login';
});

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