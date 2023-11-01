import { procurarUsuario } from "../db/usuariosController.js";
import autenticarHashSenha from "../utils/autenticarHashSenha.js";
import jwtAutenticar from "../utils/jwtAutenticar.js";

function registrosSocketLogin(socket, io) {
    socket.on('autenticarUsuario', async (dados) => {
        const usuarioEncontrado = await procurarUsuario(dados.usuario);
        if (usuarioEncontrado !== null) {
            const autenticado = autenticarHashSenha(dados.senha, usuarioEncontrado);
            if (autenticado) {
                const jwtToken = jwtAutenticar({ usuarioNome: usuarioEncontrado.usuario });
                socket.emit('AutenticadoComSucesso', jwtToken);
            } else {
                socket.emit('FalhaNaAutenticacao');
            }
        } else {
            socket.emit('usuarioInvalido');
        }
    });
}

export default registrosSocketLogin;