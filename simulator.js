const io = require('socket.io-client');
const prompt = require('prompt');
const numVars = 6;

console.log('0- localhost, 1- Digital Ocean');
prompt.get(['choice'], (err, result) => {
    let url;
    if (result['choice'] === "0")
        url = 'http://localhost:3000';
    else if (result['choice'] === "1")
        url = 'http://138.197.98.186:3000';

    console.log('Sending', numVars, 'random numbers to', url);
    start(url);
});

function start(url) {
    const socket = io(url);
    setInterval(() => {
        socket.emit('newData', createData());
    }, 250);
}

function createData () {
    let array = [];
    for (let i = 0; i < numVars; i++) {
        array.push(Math.random() * 10);
    }

    return array;
}