const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateDeviceInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.macaddress = !isEmpty(data.macaddress) ? data.macaddress : "";
	data.manufacturer = !isEmpty(data.manufacturer) ? data.manufacturer : "";
	data.model = !isEmpty(data.model) ? data.model : "";

	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}

	if (Validator.isEmpty(data.macaddress)) {
		errors.macaddress = "MAC address is required";
	}

	if (Validator.isEmpty(data.manufacturer)) {
		errors.manufacturer = "Manufacturer field is required";
	}

	if (Validator.isEmpty(data.model)) {
		errors.Model = "Model field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
