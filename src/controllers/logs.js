const Log = require('../models/log');

exports.getAll = (req, res, next) => {
	// console.log(req.app.io);
	// const status = req.query.status;
	// if (status) {
	// 	Log.find({ status: status })
	// 		.populate('endpoint', 'name url')
	// 		.exec()
	// 		.then(entries => {
	// 			const response = getResponse(entries);
	// 			res.status(200).json(response);
	// 		})
	// 		.catch(err => {
	// 			res.status(500).json({ error: err });
	// 		});
	// }

	const options = {
		populate: {
			path: 'endpoint',
			select: 'name url'
		},
		sort: {
			createdAt: 'desc'
		},
		limit: 40,
		page: parseInt(req.query.page) || 1
	};

	Log.paginate({}, options)
		.then(entries => {
			const response = getResponse(entries);
			res.status(200).json(response);
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
};

exports.getById = (req, res, next) => {
	const id = req.params.id;
	if (id) {
		Log.find({ endpoint: { _id: id } })
			.populate('endpoint', 'name url')
			.exec()
			.then(entries => {
				const response = getResponse(entries);
				res.status(200).json(response);
			})
			.catch(err => {
				res.status(500).json({ error: err });
			});
	}
};

exports.post = (req, res, next) => {
	console.log(req.body);
	const { io } = req.app;
	const newLogEntry = new Log({
		endpoint: req.body.endpoint,
		status: req.body.status,
		problem: req.body.problem,
		duration: req.body.duration
	});

	newLogEntry
		.save()
		.then(res => {
			io.sockets.emit('NewLog', res);
		})
		.catch(err => {
			console.error('log saving error!', err);
		});
};

function getResponse(entries) {
	return {
		total: entries.total,
		limit: entries.limit,
		page: entries.page,
		pages: entries.pages,
		docs: entries.docs.map(entry => {
			return {
				_id: entry._id,
				endpoint: entry.endpoint,
				status: entry.status,
				response: entry.response,
				problem: entry.problem,
				duration: entry.duration,
				createdAt: entry.createdAt
			};
		})
	};
}
