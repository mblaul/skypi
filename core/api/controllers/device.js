var Device = require("../models/Device");
var Log = require("../models/Log");

//Load input validation
const validateDeviceInput = require("../validation/device/register");
const validateDeviceLogInput = require("../validation/device/log");

module.exports.register_post = (req, res) => {
	const { errors, isValid } = validateDeviceInput(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	Device.findOne({ macaddress: req.body.macaddress }).then(device => {
		if (device) {
			errors.macaddress = "A device with that MAC address already exists";
			return res.status(400).json(errors);
		} else {
			const newDevice = new Device({
				name: req.body.name,
				macaddress: req.body.macaddress,
				manufacturer: req.body.manufacturer,
				model: req.body.model,
				category: req.body.category,
				owner: req.user.id,
				authorizedUsers: { user: req.user.id }
			});

			newDevice
				.save()
				.then(device => {
					return res.json(device);
				})
				.catch(err => {
					console.log(err);
					errors.server = "An error occured, please try again";
					return res.status(500).json(errors);
				});
		}
	});
};

module.exports.log_get = (req, res) => {
	let errors = {};

	User.findById(req.user.id)
		.then(user => {
			if (!user.isAdmin) {
				return res.status(401).send("Unauthorized");
			} else {
				Log.find().then(logs => {
					return res.json(logs);
				});
			}
		})
		.catch(err => {
			console.log(err);
			errors.server = "An error occured, please try again";
			return res.status(500).json(errors);
		});
};

module.exports.onedevice_log_get = (req, res) => {
	let errors = {};

	Device.findById(req.params.deviceId)
		.then(device => {
			Log.find({ device: device }).then(deviceLogs => {
				return res.json(deviceLogs);
			});
		})
		.catch(err => {
			console.log(err);
			errors.server = "An error occured, please try again";
			return res.status(500).json(errors);
		});
};

module.exports.log_post = (req, res) => {
	const { errors, isValid } = validateDeviceLogInput(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newLog = new Log({
		device: req.body.device,
		type: req.body.type,
		status: req.body.status,
		message: req.body.message
	});

	newLog
		.save()
		.then(log => {
			Device.findById(log.device).then(device => {
				device.lastUpdate = log.date;
				device.status = log.status;
				device.save();
			});
			return res.json(log);
		})
		.catch(err => {
			console.log(err);
			errors.server = "An error occured, please try again";
			return res.status(500).json(errors);
		});
};
