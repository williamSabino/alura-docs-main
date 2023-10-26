import { MongoClient } from 'mongodb';

const cliente = new MongoClient("mongodb+srv://Node-express:2Azelelao.@aluraaulas.ajyjtkt.mongodb.net/?retryWrites=true&w=majority");
let documentsCollections;
try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    documentsCollections = db.collection("documentos");

    console.log("Atlas connectado");
} catch (error) {
    console.log(error);
}

export { documentsCollections };