import { inserirUsuario, procurarUsuario } from "../db/usuariosController.js";

function registrosSocketCadastro(socket, io) {
    socket.on('cadastrarUsuario', async (dados) => {
        const usuarioEncontrado = await procurarUsuario(dados.usuario);
        if (usuarioEncontrado === null) {
            const usuario = await inserirUsuario(dados.usuario, dados.senha);
            if (usuario.acknowledged !== false) {
                socket.emit('usuarioCadastrado');
            } else {
                socket.emit('usuarioNãoCadastrado');
            }
        } else {
            socket.emit('usuarioExistente');
        }

    });
}

export default registrosSocketCadastro;