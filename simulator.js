const io = require('socket.io-client');
const prompt = require('prompt');

console.log('0- localhost, 1- Digital Ocean');
prompt.get(['choice'], (err, result) => {
    let socket;
    if (result.choice === "0")
        socket = io('http://localhost:3000');
    else if (result.choice === "1")
        socket = io('http://138.197.98.186:3000');

    start(socket);
});

function start(socket) {
    setInterval(() => {
        socket.emit('newData', createData());
    }, 250);
}

function createData () {
    let array = [];
    for (let i = 0; i < 6; i++) {
        array.push(Math.random() * 10);
    }

    return array;
}