const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
	device: {
		type: Schema.Types.ObjectId,
		ref: "devices",
		required: true
	},
	status: {
		type: String
	},
	type: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Log = mongoose.model("logs", LogSchema);
