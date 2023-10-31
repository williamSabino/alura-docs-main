
import registrosSocketCadastro from "./registros/EventoCadastro.js";
import registrosSocketDocumento from "./registros/EventoDocumento.js";
import registrosSocktInicio from "./registros/EventoInicio.js";
import io from "./server.js";

//escutando o evento de conexão que ocorre quando abre documento.html
io.on('connection', (socket) => {
    console.log("conectado, user: " + socket.id);
    registrosSocktInicio(socket, io);
    registrosSocketDocumento(socket, io);
    registrosSocketCadastro(socket,io);
});

