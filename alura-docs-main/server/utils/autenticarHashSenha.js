import { scryptSync, timingSafeEqual } from 'crypto';

function autenticarHashSenha(senhaDigitada, usuario){
    const hashTest = scryptSync(senhaDigitada, usuario.salSenha, 64);
    const hashReal = Buffer.from(usuario.hashSenha, 'hex');
    const auth = timingSafeEqual(hashTest, hashReal);
    return auth;
}

export default autenticarHashSenha;