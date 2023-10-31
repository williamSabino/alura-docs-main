
const socket = io();

function cadastrarUsuario(dados) {
    socket.emit('cadastrarUsuario', dados);
}

socket.on('usuarioCadastrado', () => {
    alert('Usuario cadastrado');
});

socket.on('usuarioNãoCadastrado', () => {
    alert('Usuario não Cadastrado');
});

socket.on('usuarioExistente', () => {
    alert('Usuario não cadastrado, motivo : existente');
});

export { cadastrarUsuario };