import {
    atualizarDocumento,
    deleteDocumento,
    encontrarDocumento,
    inserirDocumento,
    listarDocumentos
} from "./dbController.js";
import io from "./server.js";

//escutando o evento de conexão que ocorre quando abre documento.html
io.on('connection', (socket) => {
    //exibindo o id de conexão do socket de cada conexão
    console.log("conectado, user: " + socket.id);

    //escutando o evento e pegando todos os documentos no banco de dados
    socket.on('pegar_documentos', async (documentos) => {
        const documentosDB = await listarDocumentos();
        documentos(documentosDB);
    });

    //escutando o evento de inserir documentos na pagina index
    socket.on('inserirDocumento', async (documento) => {
        const documentoExistente = (await encontrarDocumento(documento) !== null);
        if (documentoExistente) {
            socket.emit('documento_existente', documento);
        } else {
            await inserirDocumento(documento);
            io.emit('inserir_Documento_interface', documento);
        }
    });

    //escutando o evento de excluir documentos na pagina index
    socket.on('excluir_Documento', async (documento) => {
        await deleteDocumento(documento);
        io.emit('excluir_Documento_sucesso', documento);
    });

    //escutando a seleção de documentos
    socket.on('select_document', async (document, cbDevolverTexto) => {
        //busca no banco de dados o documento selecionado no front
        const dbDocument = await encontrarDocumento(document);
        if (dbDocument) {
            //devolve o texto do banco de dados para ser printado no text-area do front
            cbDevolverTexto(dbDocument.texto);
        }
        //agrupa a informação do socket no documento selecionado
        socket.join(document);
    });

    //escutando o evento de text area enviado pela dom
    //junto com o objeto {texto:texto, documento:documento} que contem os valores digitados
    socket.on('editor_Texto', async (dados) => {
        //chama a função atualizar documento que modifica o documento exato no banco de dados
        await atualizarDocumento(dados.documento, dados.texto);
        //emite para o grupo do documento selecionado e envia de volta o texto para ser printado no front.
        socket.to(dados.documento).emit('editor_Texto_servidor', dados.texto);
    });
});

