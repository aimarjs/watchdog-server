const axios = require('axios');
const https = require('https');
const Endpoint = require('../models/endpoint');
const LogEntry = require('../models/log');
const { create } = require('apisauce');

module.exports = httpcheckups = () => {
	getAllEndpoints()
		.then(endpoints => {
			endpoints.map(endpoint => {
				checkEndpoints(endpoint);
			});
		})
		.catch(err => {
			console.log(err);
		});
};

function checkEndpoints(endpoint) {
	if (!endpoint) {
		console.log('no endpoints found');
	}
	const url = endpoint.url;
	const id = endpoint._id;
	api
		.get(url)
		.then(response => insertLogEntry(id, response))
		.catch(err => insertLogEntry(id, err.response));
}

function insertLogEntry(id, response) {
	const newLogEntry = {
		endpoint: id,
		status: response.status,
		problem: response.problem,
		duration: `${response.duration}ms`
	};

	axios
		.post('http://localhost:5000/api/logs', newLogEntry)
		.then(res => console.log('saved!', res))
		.catch(err => console.error(err));

	// const newLogEntry = new LogEntry({
	// 	endpoint: id,
	// 	status: response.status,
	// 	problem: response.problem,
	// 	duration: `${response.duration}ms`
	// });
	//
	// newLogEntry
	// 	.save()
	// 	.then()
	// 	.catch(err => {
	// 		console.error('log saving error!', err);
	// 	});
}

function getAllEndpoints() {
	return new Promise((resolve, reject) => {
		Endpoint.find()
			.exec()
			.then(res => {
				let endpoints = [];

				for (let i in res) {
					endpoints.push(res[i]);
				}

				return resolve(endpoints);
			})
			.catch(err => {
				console.log(err);
			});
	});
}

const api = create({
	baseURL: '...',
	httpsAgent: new https.Agent({
		rejectUnauthorized: false
	})
});

// const instance = axios.create({
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false
//   })
// });
