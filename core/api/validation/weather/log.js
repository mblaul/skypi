const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateWeatherLogInput(data) {
  let errors = {};

  data.source = !isEmpty(data.source) ? data.source : '';
  data.temperature = !isEmpty(data.temperature) ? data.temperature : '';
  data.humidity = !isEmpty(data.humidity) ? data.humidity : '';
  data.latitude = !isEmpty(data.latitude) ? data.latitude : '';
  data.longitude = !isEmpty(data.longitude) ? data.longitude : '';
  data.pressure = !isEmpty(data.pressure) ? data.pressure : '';

  if (Validator.isEmpty(data.source)) {
    errors.source = 'Source field is required';
  }
  if (Validator.isEmpty(String(data.temperature))) {
    errors.temperature = 'Temperature field is required';
  }
  if (Validator.isEmpty(String(data.humidity))) {
    errors.humidity = 'Humidity field is required';
  }
  if (Validator.isEmpty(String(data.latitude))) {
    errors.latitude = 'Latitude field is required';
  }
  if (Validator.isEmpty(String(data.longitude))) {
    errors.longitude = 'Longitude field is required';
  }
  if (Validator.isEmpty(String(data.pressure))) {
    errors.pressure = 'Pressure field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
