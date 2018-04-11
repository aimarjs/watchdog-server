const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const logSchema = mongoose.Schema({
  endpoint: { type: mongoose.Schema.Types.ObjectId, ref: "Endpoint" },
  status: { type: Number },
  problem: { type: String },
  duration: { type: String }
});

logSchema.plugin(timestamps);

module.exports = mongoose.model("Log", logSchema);
