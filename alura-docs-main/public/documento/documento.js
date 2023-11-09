import { editorTexto, excluirDocumento, selectDocument } from "./socket-front.js";


const editor = document.getElementById('editor-texto');
const titulo = document.getElementById('titulo-documento');
const btnExcluir = document.getElementById('excluir-documento');
//pega as query's existentes na URL
const queryParams = new URLSearchParams(window.location.search);
const documentoAtual = queryParams.get('nome');
const listaUser = document.getElementById('usuarios-conectados');

//atribui o parametro da query como titulo do documento
titulo.textContent = documentoAtual || "Documento Não definido";

//evento de click no botao para enviar requisição ao back para excluir o documento
btnExcluir.addEventListener('click', (e) => {
    window.location.href = '/';
    excluirDocumento(documentoAtual);
});

//captura de evento de teclado, ao digitar no campo de texto vai semdo emitido requisições para ser gravado no banco de dados o conteudo, quem estiver na mesma sala vai ver as alterações em tempo real;
editor.addEventListener('keyup', () => {
    editorTexto({
        texto: editor.value,
        documento: documentoAtual,
    });
});

function autorizarUsuario(payloadToken) {
    //seleciona o documento e envia a seleção para o back
    selectDocument({documentoAtual, usuarioAtual: payloadToken.usuarioNome});
}

function atualizaListaUsuarios(listaUsuarios){
    console.log(listaUsuarios);
    listaUser.innerHTML = "";

    listaUsuarios.forEach(usuario => {
        listaUser.innerHTML += ` <li class="list-group-item">${usuario}</li>`;
    });
}


//edita o campo de texto
function textAreaText(texto) {
    editor.value = texto;
};

//Ao excluir o documento, se o usuario estive no documento que foi excluido, ele é redirecionado para index.html
function alertareRedirecionar(documento) {
    if (documento === documentoAtual) {
        alert(`Documento: ${documento} Excluido !!`);
        window.location.href = '/';
    }
};

export { textAreaText, alertareRedirecionar, autorizarUsuario, atualizaListaUsuarios };
