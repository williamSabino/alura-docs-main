import { documentsCollections } from "./dbAtlas.js";

let atualizarDocumento = (nome, texto) => {
    const documentAtualizado = documentsCollections.updateOne({ nome }, { $set: { texto } });
    return documentAtualizado;
}

let encontrarDocumento = (nome) => {
    const documento = documentsCollections.findOne({ nome: nome });
    return documento;
}

export {atualizarDocumento, encontrarDocumento};