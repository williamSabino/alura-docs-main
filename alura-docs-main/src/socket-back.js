import { atualizarDocumento, encontrarDocumento } from "./dbController.js";
import io from "./server.js";

//escutando o evento de conexão que ocorre quando abre documento.html
io.on('connection', (socket) => {
    socket.on('select_document', async (document, cbDevolverTexto) => {

        const dbDocument = await encontrarDocumento(document);
        if (dbDocument) {
            cbDevolverTexto(dbDocument.texto);
        }
        socket.join(document);
    });

    //escutando o evento de text area enviado pela dom
    //junto com a variavell texto que contem os valores digitados
    socket.on('editor_Texto', async (dados) => {
        //ao escutar e receber do front vamos mandar de volta para os clientes connectados
        //o broadcast serve para dizer que não precisa enviar para esse canal que emitiu
        await atualizarDocumento(dados.documento, dados.texto);
        socket.to(dados.documento).emit('editor_Texto_servidor', dados.texto);
    });
});

