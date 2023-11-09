const listaDeusers = []

function procurarConexao(user,nomeDocumento){
    return listaDeusers.find((userResponse)=>{
        return userResponse.nomeDocumento===nomeDocumento && userResponse.nomeUser===user;
    });
}

function inserirUser(user) {
    listaDeusers.push(user);
}

function listarUsers(nomeDocumento){
    return listaDeusers
    .filter((documento) => documento.nomeDocumento===nomeDocumento)
    .map((documento) => documento.nomeUser);
}

function deletarUser(user, nomeDocumento) {
    const indice = listaDeusers.findIndex((userResponse)=>{
        return userResponse.nomeDocumento===nomeDocumento && userResponse.nomeUser===user;
    });
    listaDeusers.splice(indice, 1);
}



export {procurarConexao ,inserirUser, listarUsers, deletarUser};