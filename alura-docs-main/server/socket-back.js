import "dotenv/config";
import registrosSocketCadastro from "./registros/EventoCadastro.js";
import registrosSocketDocumento from "./registros/EventoDocumento.js";
import registrosSocktInicio from "./registros/EventoInicio.js";
import registrosSocketLogin from "./registros/EventoLogin.js";
import autenticarUsuario from "./middleware/autenticarUsuario.js";
import io from "./server.js";

const nspUsuarios = io.of("/usuarios");

io.of("/usuarios").use(autenticarUsuario);

nspUsuarios.on("connection", (socket) => {
    registrosSocktInicio(socket, nspUsuarios);
    registrosSocketDocumento(socket, nspUsuarios);
});

//escutando o evento de conexão que ocorre quando abre documento.html
io.of("/").on('connection', (socket) => {
    console.log("conectado, user: " + socket.id);
    registrosSocketCadastro(socket,io);
    registrosSocketLogin(socket,io);
});

