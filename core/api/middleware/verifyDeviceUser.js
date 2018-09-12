User = require("../models/User");
Device = require("../models/Device");

module.exports = verifyDeviceUser = (req, res, next) => {
	Device.findById(req.params.deviceId)
		.then(device => {
			device.authorizedUsers.map(authorizedUser => {
				if (authorizedUser.user == req.user.id) {
					return next();
				}
			});
		})
		.catch(() => {
			return res.status(401).send("Unauthorized");
		});
};
