import jwt from 'jsonwebtoken';
function autenticarUsuario(socket, next){
    const token = socket.handshake.auth.token;

    try {
        const payloadToken = jwt.verify(token, process.env.KEY_JWT);
        socket.emit("atualizarUsuario", payloadToken);
        next();
    } catch (error) {
        next(error);
    }
}

export default autenticarUsuario;