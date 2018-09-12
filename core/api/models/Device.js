const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	macaddress: {
		type: String,
		required: true
	},
	manufacturer: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	category: {
		type: [String]
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "users",
		required: true
	},
	authorizedUsers: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			relation: {
				type: String,
				default: "Patient"
			}
		}
	],
	status: {
		type: String,
		default: "Created"
	},
	startDate: {
		type: Date,
		default: Date.now
	},
	lastUpdate: {
		type: Date,
		default: Date.now
	}
});

module.exports = Device = mongoose.model("devices", DeviceSchema);
