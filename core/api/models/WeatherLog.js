const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeatherLogSchema = new Schema({
	device: {
		type: Schema.Types.ObjectId,
		ref: "devices",
		required: true
	},
	temperature: {
		type: Number,
		required: true
	},
	humidity: {
		type: Number,
		required: true
	},
	latitude: {
		type: String,
		required: true
	},
	longitude: {
		type: String,
		required: true
	},
	pressure: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = WeatherLog = mongoose.model("weatherlogs", WeatherLogSchema);
