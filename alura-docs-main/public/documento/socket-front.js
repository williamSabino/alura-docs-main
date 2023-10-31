import { alertareRedirecionar, textAreaText } from "./documento.js";

const socket = io();

//sockets 

//pega o evento em conjunto com o que foi digitado no documents.html de outras conexões 
//e exibe para todas as conexões existentes naquela sala
socket.on("editor_Texto_servidor", (texto) => {
    textAreaText(texto);
});

//pega o evento de exclusão e alerta todos os que estão na mesma sala e redireciona para a pagina index.html
socket.on('excluir_Documento_sucesso', (documento) => {
    alertareRedirecionar(documento);
});


// funções

//emite uma requisição para para editor de texto juntamente com os dados de documento e texto.
function editorTexto(dados) {
    socket.emit("editor_Texto", dados);
}

//ao selecionar o documento vai ser enviado para o back o documento selecionado e so podera ver o conteudo especifico daquele documento
function selectDocument(documento) {
    socket.emit("select_document", documento, (document) => {
        textAreaText(document);
    });
}

//emite a ordem para que seja feita a exclusão no banco de dados
function excluirDocumento(documento) {
    socket.emit("excluir_Documento", documento);
}


export { editorTexto, selectDocument, excluirDocumento };