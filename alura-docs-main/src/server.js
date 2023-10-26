import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import "../src/dbAtlas.js";

const app = express();
const port = process.env.PORT || 3000;

//pegando o caminho atual
const caminhoAtual = url.fileURLToPath(import.meta.url);
//pegando o local onde estão os arquivos estaticos
const diretorioPublico = path.join(caminhoAtual, "../.." , "public");
//estabelecendo os arquivos estaticos obs: ele renderiza o index ao ser iniciado o server
app.use(express.static(diretorioPublico));
//criando uma conexão http
const serverHttp = http.createServer(app);

serverHttp.listen(port, ()=>{console.log('listening on port', port)});

//inicializando um socket passando o server local criado.
const io = new Server(serverHttp);

export default io;