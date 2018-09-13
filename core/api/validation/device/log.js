const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateDeviceLogInput(data) {
	let errors = {};

	data.device = !isEmpty(data.device) ? data.device : "";
	data.status = !isEmpty(data.status) ? data.status : "";
	data.type = !isEmpty(data.type) ? data.type : "";
	data.message = !isEmpty(data.message) ? data.message : "";

	if (Validator.isEmpty(data.device)) {
		errors.device = "Device field is required";
	}
	if (Validator.isEmpty(data.status)) {
		errors.status = "Status field is required";
	}
	if (Validator.isEmpty(data.type)) {
		errors.type = "Status type field is required";
	}
	if (Validator.isEmpty(data.message)) {
		errors.message = "Message field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
