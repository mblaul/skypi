const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateWeatherLocationQuery(data) {
  let errors = {};

  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : '';

  if (
    Validator.isEmpty(String(data.city)) &&
    Validator.isEmpty(String(data.state))
  ) {
    if (Validator.isEmpty(String(data.zipcode))) {
      errors.location =
        'City and state, or zip code (alone) is required to complete request';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
