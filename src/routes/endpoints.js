const express = require("express");
const swagger = require("swagger-spec-express");
const router = express.Router();
swagger.swaggerize(router);

const endpointControllers = require("../controllers/endpoints");

router.get("/", endpointControllers.getAll).describe({
  responses: {
    200: {
      description: "Returns all the endpoints"
    }
  },
  summary: "Route for fetching all available endpoints"
});
router.post("/", endpointControllers.post).describe({
  responses: {
    200: {
      description: "Post endpoints for monitoring"
    }
  }
});

module.exports = router;
