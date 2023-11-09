import { definirCookie } from "../utils/cookies.js";

const socket = io();

socket.on("connect_error", (err) => {
    alert(err);
});

function autenticarUsuario(dados) {
    socket.emit('autenticarUsuario', dados);
};

socket.on('usuarioInvalido', () => {
    alert("usuario invalido");
});

socket.on('AutenticadoComSucesso', (jwtToken) => {
    definirCookie("jwtToken", jwtToken);
    alert("Autenticado Com Sucesso");
    window.location.href = "/";
})

socket.on('FalhaNaAutenticacao', () => {
    alert("Falha Na Autenticacao");
})

export { autenticarUsuario };