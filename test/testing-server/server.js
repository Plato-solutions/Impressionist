import { readFile } from 'fs/promises';
import http from 'http';

class NanoServer {
    
    #server;
    #sockets = [];

    constructor(filePath = 'test/testing-server/index.html', port = 8081) {
        this.filePath = filePath;
        this.port = port;
    }

    async start() {
        const file = await this.#retrieveFile();
        this.#server = await this.#createServer(file);
        console.log(`Server started: http://localhost:${this.port}`);
    }

    async #retrieveFile() {
        return await readFile(this.filePath, { encoding: 'utf-8' });
    }

    #createServer(file) {
        return new Promise((resolve, reject) => {
            const server = http.createServer(function (req, res) {
                  res.writeHead(200);
                  res.end(file);
            }).listen(this.port);

            this.#registerSockets(server, this.#sockets);

            resolve(server);
        });
        
    }

    #registerSockets(server, socketsStack) {
        server.on('connection', function (socket) {
            socketsStack.push(socket);
        });
    }

    stop() {
        return new Promise((resolve, reject) => {
            
            this.#destroySockets();

            this.#server.close(() => {
                console.log('Server closed');
                resolve();
            });
        });
    }

    #destroySockets() {
        for(let socket of this.#sockets) {
            socket.destroy();
        }
    }
}

export default NanoServer;
