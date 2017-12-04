const io = require('socket.io-client');
const socket = io('http://localhost:3000');
//const socket = io('http://138.197.98.186:3000');


setInterval(() => {
    socket.emit('newData', createData());
}, 250);

function createData () {
    let array = [];
    for (let i = 0; i < 6; i++) {
        array.push(Math.random() * 10);
    }

    return array;
}