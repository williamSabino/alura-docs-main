import {
    atualizarDocumento,
    deleteDocumento,
    encontrarDocumento,
} from "../db/documentosController.js";
import { deletarUser, inserirUser, listarUsers, procurarConexao } from "../utils/listaDeUsuarios.js";

function registrosSocketDocumento(socket, io) {

    //escutando o evento de excluir documentos na pagina index
    socket.on('excluir_Documento', async (documento) => {
        await deleteDocumento(documento);
        io.emit('excluir_Documento_sucesso', documento);
    });

    //escutando a seleção de documentos
    socket.on('select_document', async ({ documentoAtual, usuarioAtual }, cbDevolverTexto) => {
        //busca no banco de dados o documento selecionado no front
        const dbDocument = await encontrarDocumento(documentoAtual);
        if (dbDocument) {

            const conexaoEncontrada = procurarConexao(usuarioAtual, documentoAtual);
            
            if(!conexaoEncontrada){
                socket.data = {
                    conectado: true,
                };
                //agrupa a informação do socket no documento selecionado
                socket.join(documentoAtual);
                inserirUser({ nomeDocumento: documentoAtual, nomeUser: usuarioAtual });
                const usersLista = listarUsers(documentoAtual);
                io.to(documentoAtual).emit('usersNoDocumento', usersLista);
                //devolve o texto do banco de dados para ser printado no text-area do front
                cbDevolverTexto(dbDocument.texto);
            } else {
                socket.emit('conexaoEncontrada');
            }
            }


        socket.on('disconnect', () => {
           if (socket.data.conectado) {
            deletarUser(usuarioAtual, documentoAtual);
            const usersLista = listarUsers(documentoAtual);
            io.to(documentoAtual).emit('usersNoDocumento', usersLista);
           }
        });
    });

    //escutando o evento de text area enviado pela dom
    //junto com o objeto {texto:texto, documento:documento} que contem os valores digitados
    socket.on('editor_Texto', async (dados) => {
        //chama a função atualizar documento que modifica o documento exato no banco de dados
        await atualizarDocumento(dados.documento, dados.texto);
        //emite para o grupo do documento selecionado e envia de volta o texto para ser printado no front.
        socket.to(dados.documento).emit('editor_Texto_servidor', dados.texto);
    });
}

export default registrosSocketDocumento;