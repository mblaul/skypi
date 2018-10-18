const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateWeatherLogInput(data) {
  let errors = {};

  data.source = !isEmpty(data.source) ? data.source : "";
  data.temperature = !isEmpty(data.temperature) ? data.temperature : "";
  data.humidity = !isEmpty(data.humidity) ? data.humidity : "";
  data.latitude = !isEmpty(data.latitude) ? data.latitude : "";
  data.longitude = !isEmpty(data.longitude) ? data.longitude : "";
  data.pressure = !isEmpty(data.pressure) ? data.pressure : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (Validator.isEmpty(data.source)) {
    errors.source = "Source field is required";
  }
  if (Validator.isEmpty(String(data.temperature))) {
    errors.temperature = "Temperature field is required";
  }
  if (Validator.isEmpty(String(data.humidity))) {
    errors.humidity = "Humidity field is required";
  }
  if (Validator.isEmpty(String(data.latitude))) {
    errors.latitude = "Latitude field is required";
  }
  if (Validator.isEmpty(String(data.longitude))) {
    errors.longitude = "Longitude field is required";
  }
  if (Validator.isEmpty(String(data.pressure))) {
    errors.pressure = "Pressure field is required";
  }
  if (Validator.isEmpty(String(data.city))) {
    errors.city = "City field is required";
  }
  if (Validator.isEmpty(String(data.state))) {
    errors.state = "State field is required";
  }
  if (Validator.isEmpty(String(data.zipcode))) {
    errors.zipcode = "ZIP code field is required";
  }
  if (Validator.isEmpty(String(data.country))) {
    errors.country = "Country field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
