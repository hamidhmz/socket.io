const http = require('http');
const websocket = require('ws');

const server = http
	.createServer(function (request, response) {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.end('Hello World');
	})
	.listen(5000);

const wss = new websocket.Server({ server });

wss.on('headers', (headers, req) => {
	// when new connection has been triggered
	console.log('this is headers', headers);
});

wss.on('connection', (ws, req) => {
	ws.on('message', (msg) => {
		console.log('-----', msg, '------');
		ws.send(msg);
	});

	ws.send('welcome to websocket server');
});

console.log('Server running at http://localhost:5000/');
