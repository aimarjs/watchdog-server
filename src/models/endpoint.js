const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const endpointSchema = mongoose.Schema({
  name: { type: String },
  url: { type: String },
  expectedResponse: { type: String },
  interval: { type: Number }
});

endpointSchema.plugin(timestamps);

module.exports = mongoose.model("Endpoint", endpointSchema);
