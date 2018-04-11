const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const logSchema = mongoose.Schema({
	endpoint: { type: mongoose.Schema.Types.ObjectId, ref: 'Endpoint' },
	status: { type: Number },
	problem: { type: String },
	duration: { type: String }
});

logSchema.plugin(timestamps);
logSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Log', logSchema);
