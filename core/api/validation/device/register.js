const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateDeviceInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.macaddress = !isEmpty(data.macaddress) ? data.macaddress : '';
  data.model = !isEmpty(data.model) ? data.model : '';
  data.ispublic = !isEmpty(data.ispublic) ? data.ispublic : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.macaddress)) {
    errors.macaddress = 'MAC address is required';
  }

  if (Validator.isEmpty(data.model)) {
    errors.model = 'Model field is required';
  }

  if (Validator.isEmpty(data.ispublic)) {
    errors.ispublic = 'Public visibility field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
