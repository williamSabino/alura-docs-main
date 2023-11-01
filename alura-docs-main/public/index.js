import { inserirDocumento } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";

const cookie = obterCookie("jwtToken");

console.log(cookie);

const lista = document.querySelector("#lista-documentos");
const formAdd = document.querySelector("#form-adiciona-documento");
const inputDocumento = document.querySelector("#input-documento");
const btn_logout = document.getElementById("botao-logout");

btn_logout.addEventListener("click", () => {
  removerCookie("jwtToken");
  alert("Usuario Saiu da seção");
  window.location.href = '/login';
});

function inserirLinha(documento) {
  lista.innerHTML += `
    <a href="./documento/documento.html?nome=${documento}"
     class="list-group-item list-group-item-action"
     id="documento-${documento}"
     >
    ${documento}
  </a>`;
};

function removerLinha(documento) {
  const linha = document.getElementById(`documento-${documento}`)
  lista.removeChild(linha);
}

formAdd.addEventListener("submit", () => {
  inserirDocumento(inputDocumento.value);
});



export { inserirLinha, removerLinha };