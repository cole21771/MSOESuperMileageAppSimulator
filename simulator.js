const io = require('socket.io-client');
const prompt = require('prompt');

const serverMap = [
['localhost', 'http://localhost:3000'],
['Home', 'http://67.173.126.234:3000'],
['smv-live', 'http://smv-live.msoesae.org'],
['Apartment Desktop', 'http://65.29.164.69:3000']
];
const numVars = 7;
const delay = 250;
let startTime;

function promptForServer() {
	return new Promise((resolve, reject) => {
		console.log(serverMap.reduce((acc, pair, i, arr) => acc += i + "- " + pair[0] + (i++ !== arr.length - 1 ? ', ' : ''), ''));

		prompt.get(['choice'], (err, result) => {
			const choice = parseInt(result.choice);
			if (err) {
				reject(err);
			} else if (isNaN(choice)) {
				reject('Please input a number as your choice');
			}
			resolve(serverMap[choice]);
		});
	});
}

function start(pair) {
    console.log('Sending time and', numVars, 'random numbers to', pair[1], 'every', delay, 'ms');
    const socket = io(pair[1]);
    startTime = Date.now();
	
	let data = new Array(numVars + 1).fill(0);
    setInterval(() => {
		data = createData(data);
		const stringData = JSON.stringify(data);
		console.log(stringData);
        socket.emit('newData', stringData);
    }, delay);
}

function createData(lastData) {
	lastData.shift();
    let array = [];
    for (let i = 0; i < numVars; i++) {
        array.push(Math.ceil(Math.random() * lastData[i] + Math.random() * (lastData[i] / 1.3) + Math.random()));
    }
	array.unshift(Date.now() - startTime);
    
    return array;
}

promptForServer()
.then(start)
.catch((err) => {
	throw new Error(err);
});