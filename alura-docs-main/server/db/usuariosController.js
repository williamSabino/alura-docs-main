import criarHashSenha from "../utils/criarHashSenha.js";
import { usuariosCollections } from "./dbAtlas.js";

function procurarUsuario(usuario) {
    return usuariosCollections.findOne({ usuario });
}

function inserirUsuario(usuario, senha) {
    const {hashSenha , salSenha} = criarHashSenha(senha);
    return usuariosCollections.insertOne({ usuario, hashSenha, salSenha });
};

export { inserirUsuario, procurarUsuario };