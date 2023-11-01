import jwt from 'jsonwebtoken';

function jwtAutenticar(playload) {
    const response = jwt.sign(playload, process.env.KEY_JWT, {
        expiresIn: "1h",
    });

    return response;
}

export default jwtAutenticar;