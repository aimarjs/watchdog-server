const Log = require("../models/log");

exports.getAll = (req, res, next) => {
  const status = req.query.status;
  if (status) {
    Log.find({ status: status })
      .populate("endpoint", "name url")
      .exec()
      .then(entries => {
        const response = getResponse(entries);
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }

  Log.find()
    .populate("endpoint", "name url")
    .exec()
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
      .populate("endpoint", "name url")
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

function getResponse(entries) {
  return {
    count: entries.length,
    entries: entries.map(entry => {
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
