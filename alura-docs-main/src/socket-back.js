import io from "./server.js";

//escutando o evento de conexão que ocorre quando abre documento.html
io.on('connection', (socket)=>{
    console.log("User connected: ", socket.id);

    socket.on('select_document', (document)=>{
        socket.join(document);
    });

    //escutando o evento de text area enviado pela dom
    //junto com a variavell texto que contem os valores digitados
    socket.on('editor_Texto', (dados)=>{
        //ao escutar e receber do front vamos mandar de volta para os clientes connectados
        //o broadcast serve para dizer que não precisa enviar para esse canal que emitiu
        socket.to(dados.documento).emit('editor_Texto_servidor', dados.texto);
    });

    socket.on('disconnect', (motivo)=>{
        console.log(`User Disconnect, id: ${socket.id}, motivo: ${motivo}`);
    });
});