const socket = io();

function autenticarUsuario(dados) {
    socket.emit('autenticarUsuario', dados);
};

socket.on('usuarioInvalido', () => {
    alert("usuario invalido");
});

socket.on('AutenticadoComSucesso', () => {
    alert("Autenticado Com Sucesso");
})

socket.on('FalhaNaAutenticacao', () => {
    alert("Falha Na Autenticacao");
})

export { autenticarUsuario };