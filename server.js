const http = require('http');
const socketIO = require('socket.io');
const app = require('./src/app');
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server);
// app.set('socketio', io);
app.io = io;

let clients = {};

io.sockets.on('connection', socket => {
	clients[socket.id] = socket;

	console.log(' %s sockets connected', io.engine.clientsCount, socket.id);

	socket.on('disconnect', () => {
		delete clients[socket.id];
		console.log('user disconnected');
	});

	// socket.on('coding event', function(data) {
	// 	socket.broadcast.to(data.room).emit('receive code', data);
	// });
});

server.listen(port);
