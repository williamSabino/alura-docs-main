import { editorTexto, excluirDocumento, selectDocument } from "./socket-front.js";


const editor = document.getElementById('editor-texto');
const titulo = document.getElementById('titulo-documento');
const queryParams = new URLSearchParams(window.location.search);
const documentoAtual = queryParams.get('nome');
const btnExcluir = document.getElementById('excluir-documento');

titulo.textContent = documentoAtual || "Documento Não definido";

btnExcluir.addEventListener('click', (e) => {
    window.location.href='/';
    excluirDocumento(documentoAtual);
});

editor.addEventListener('keyup', () => {
    editorTexto({
        texto: editor.value,
        documento: documentoAtual,
    });
});

function textAreaText(texto) {
    editor.value = texto;
}

selectDocument(documentoAtual);

function alertareRedirecionar (documento){
    if(documento === documentoAtual){
        alert(`Documento: ${documento} Excluido !!`);
        window.location.href = '/';
    } 
}

export { textAreaText , alertareRedirecionar };
