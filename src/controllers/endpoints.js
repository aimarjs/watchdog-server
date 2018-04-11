const Endpoint = require("../models/endpoint");

exports.getAll = (req, res, next) => {
  Endpoint.find()
    .then(endpoints => {
      const response = {
        count: endpoints.length,
        endpoints: endpoints.map(endpoint => {
          return {
            _id: endpoint._id,
            name: endpoint.name,
            url: endpoint.url,
            logs: `${req.protocol}://${req.headers.host}/api/logs/${
              endpoint._id
            }`
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

exports.post = (req, res, next) => {
  const newEndpoint = new Endpoint({
    name: req.body.name,
    url: req.body.url
  });

  newEndpoint
    .save()
    .then(result => {
      res.status(201).json({
        message: "New endpoint successfully created",
        endpoint: result
      });
    })
    .catch(err => {
      res.status(404).json({
        message: "Endpoint creation failed",
        error: err
      });
    });
};
