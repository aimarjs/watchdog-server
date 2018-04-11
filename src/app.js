const express = require('express');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const packageJson = require('../package.json');
const swaggerUi = require('swagger-ui-express');
const swagger = require('swagger-spec-express');
const http = require('http');
const httpcheckups = require('./monitoring/httpcheckups');
const cors = require('cors');

const logRoutes = require('./routes/logs');
const endpointsRoutes = require('./routes/endpoints');

const app = express();

// console.log(io);
// const io = socketIo(server);
// io.origins(['http://localhost:3000']);
// app.set('socketio', io);
//
// io.on('connection', socket => {
// 	console.log('New client connected'), getApiAndEmit(socket);
// 	socket.on('disconnect', () => console.log('Client disconnected'));
// });
// const getApiAndEmit = async socket => {
// 	try {
// 		console.log('cotcha', socket);
// 		// const res = await axios.get(
// 		// 	'https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558'
// 		// );
// 		socket.emit('NewLog', 'hello from server');
// 	} catch (error) {
// 		console.error(`Error: ${error.code}`);
// 	}
// };

const options = {
	title: packageJson.title,
	version: packageJson.version,
	description: packageJson.description,
	consumes: ['application/json'],
	produces: ['application/json'],
	swaggerUrl: 'http://localhost:5000/swagger.json'
};
swagger.initialise(app, options);

mongoose
	.connect('mongodb://localhost:27017/watchdog')
	.then(() => console.log('connection successful'))
	.catch(err => console.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true
};
app.use(cors(corsOptions));

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);
// 	// res.header('Access-Control-Allow-Credentials', 'true');
// 	// if (req.method === 'OPTIONS') {
// 	// 	res.header('Access-Control-Allow-Origin', '*');
// 	// 	res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
// 	// 	return res.status(200).json({});
// 	// }
// 	next();
// });

app.get('/swagger.json', (err, res) => {
	res.status(200).json(swagger.json());
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, options));

app.use('/api/logs', logRoutes);
app.use('/api/endpoints', endpointsRoutes);

app.use('/api', (req, res, next) => {
	res.status(200).json({
		message: 'ok'
	});
});

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

setInterval(httpcheckups, 60000);
swagger.compile();

module.exports = app;
