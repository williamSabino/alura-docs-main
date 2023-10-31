import {
    encontrarDocumento,
    inserirDocumento,
    listarDocumentos
} from "../db/documentosController.js";

function registrosSocktInicio(socket, io) {
    socket.on('pegar_documentos', async (documentos) => {
        const documentosDB = await listarDocumentos();
        documentos(documentosDB);
    });

    socket.on('inserirDocumento', async (documento) => {
        const documentoExistente = (await encontrarDocumento(documento) !== null);
        if (documentoExistente) {
            socket.emit('documento_existente', documento);
        } else {
            await inserirDocumento(documento);
            io.emit('inserir_Documento_interface', documento);
        }
    });
}

export default registrosSocktInicio;