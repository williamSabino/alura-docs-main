import { procurarUsuario } from "../db/usuariosController.js";
import autenticarHashSenha from "../utils/autenticarHashSenha.js";

function registrosSocketLogin(socket, io) {
    socket.on('autenticarUsuario', async (dados) => {
        const usuarioEncontrado = await procurarUsuario(dados.usuario);
        if (usuarioEncontrado !== null) {
           const autenticado =  autenticarHashSenha(dados.senha, usuarioEncontrado);
           if(autenticado){
            socket.emit('AutenticadoComSucesso');
           } else {
            socket.emit('FalhaNaAutenticacao');
           }
        }else {
            socket.emit('usuarioInvalido');
        }
    });
}

export default registrosSocketLogin;