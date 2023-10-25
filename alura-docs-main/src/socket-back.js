import io from "./server.js";

//escutando o evento de conexão que ocorre quando abre documento.html
io.on('connection', (socket)=>{
    console.log("client connected !!!", socket.id);

    //escutando o evento de text area enviado pela dom
    //junto com a variavell texto que contem os valores digitados
    socket.on('editor_Texto', (texto)=>{
        //ao escutar e receber do front vamos mandar de volta para os clientes connectados
        //o broadcast serve para dizer que não precisa enviar para esse canal que emitiu
        socket.broadcast.emit('editor_Texto_servidor', texto);
    });
});