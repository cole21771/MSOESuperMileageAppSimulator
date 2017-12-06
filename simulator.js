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
    }, 100);
}

let lastArray = new Array(numVars).fill(0);
function createData () {
    let array = [];
    for (let i = 0; i < numVars; i++) {
        array.push(Math.random() * lastArray[i] + Math.random() * (lastArray[i] / 1.3) + Math.random());
    }
    lastArray = array;
    return JSON.stringify(array);
}