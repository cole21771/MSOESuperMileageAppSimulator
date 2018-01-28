const io = require('socket.io-client');
const prompt = require('prompt');

class Server {
    constructor(name, ip, port) {
        this.name = name;
        this.ip = ip;
        this.port = port;
    }

    getURL() {
        return this.ip + ":" + this.port;
    }
}

const numVars = 6;
const delay = 250;
let servers;
let startTime;

function setupServers() {
    servers = [
        new Server('localhost', 'http://localhost', '3000'),
        new Server('Digital Ocean', 'http://138.197.98.186', '3000'),
        new Server('Apartment Desktop', 'http://65.29.164.69', '3000')
    ];
}

function promptForServer() {
    let options = "";

    servers.forEach((server, index, array) => {
        options += index + "- " + server.name + (index === array.length - 1 ? "" : ", ");
    });

    console.log(options);

    prompt.get(['choice'], (err, result) => {
        start(servers[result['choice']].getURL());
    });
}

setupServers();
promptForServer();

function start(url) {
    console.log('Sending', numVars, 'random numbers and time to', url, 'every', delay, 'ms');
    const socket = io(url);
    startTime = Date.now();
    setInterval(() => {
        socket.emit('newData', createData());
    }, delay);
}

let lastArray = new Array(numVars).fill(0);
function createData() {
    let array = [];
    for (let i = 0; i < numVars; i++) {
        array.push(Math.random() * lastArray[i] + Math.random() * (lastArray[i] / 1.3) + Math.random());
    }
    array.push(Date.now() - startTime);
    lastArray = array;
    return JSON.stringify(array);
}