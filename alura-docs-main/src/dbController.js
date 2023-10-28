import { documentsCollections } from "./dbAtlas.js";

let atualizarDocumento = (nome, texto) => {
    const documentAtualizado = documentsCollections.updateOne({ nome }, { $set: { texto } });
    return documentAtualizado;
}

let encontrarDocumento = (nome) => {
    const documento = documentsCollections.findOne({ nome: nome });
    return documento;
}

let listarDocumentos = ()=>{
    const documentos = documentsCollections.find().toArray();
    return documentos;
};

let inserirDocumento = (nome) =>{
    documentsCollections.insertOne({
        nome: nome,
        texto: `Texto do documento: ${nome}`,
    })
}

let deleteDocumento = (documento) => {
    documentsCollections.deleteOne({nome: documento});
}

export {atualizarDocumento, encontrarDocumento, listarDocumentos, inserirDocumento, deleteDocumento};