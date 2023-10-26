import { editorTexto, selectDocument } from "./socket-front.js";


const editor = document.getElementById('editor-texto');
const titulo = document.getElementById('titulo-documento');
const queryParams = new URLSearchParams(window.location.search);
const documentoAtual = queryParams.get('nome');

titulo.textContent = documentoAtual || "Documento Não definido";

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

export { textAreaText };
