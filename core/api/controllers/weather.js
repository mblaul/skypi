var Weather = require('../models/Weather');
var Device = require('../models/Device');

//Load input validation
const validateWeatherLogInput = require('../validation/weather/log');
//Need to add validation for other routes

//Set up an empty errors object is no validation is used in a route
let errors = {};

module.exports.log_post = (req, res) => {
  const { errors, isValid } = validateWeatherLogInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newWeather = new Weather({
    source: req.body.source,
    device: req.body.device,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    pressure: req.body.pressure,
    precipitation: req.body.precipitation,
    description: req.body.description,
    detail: req.body.detail,
    wind: req.body.wind,
    winddirection: req.body.winddirection,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    country: req.body.country
  });

  newWeather
    .save()
    .then(log => {
      if (log.device) {
        Device.findById(log.device).then(device => {
          device.lastWeatherLog = log;
          device.save();
        });
      }
      return res.json(log);
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.log_get = (req, res) => {
  Device.find({ 'authorizedUsers.user': req.user.id })
    .then(devices => {
      // Collect all the device IDs from the authorized user
      const deviceIds = devices.map(device => {
        return device._id;
      });

      // Find logs for the device IDs from above
      Weather.find({ device: { $in: deviceIds } }).then(logs => {
        return res.json(logs);
      });
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.data_device_get = (req, res) => {
  const device = req.params.deviceId;

  Weather.find({ device: device })
    .sort({ date: -1 })
    .then(logs => {
      return res.json(logs);
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.data_private_get = (req, res) => {
  // Find all devices where you're an authorized user
  Device.find({ 'authorizedUsers.user': req.user.id })
    .then(devices => {
      // Collect all the device IDs from the authorized user field
      const deviceIds = devices.map(device => {
        return device._id;
      });

      // Find logs for the device IDs from above
      Weather.find({ device: { $in: deviceIds } })
        .sort({ date: -1 })
        .then(logs => {
          return res.json(logs);
        });
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.data_public_get = (req, res) => {
  // Find all device logs for public devices
  Device.find({ 'roles.isPublic': true })
    .then(devices => {
      // Collect all the device IDs from the isPublic field
      const deviceIds = devices.map(device => {
        return device._id;
      });

      // Find logs for the device IDs from above
      Weather.find({ device: { $in: deviceIds } })
        .sort({ date: -1 })
        .then(logs => res.json(logs));
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.data_public_dates_post = (req, res) => {
  const startDate = req.body.startdate;
  const endDate = req.body.enddate;

  // Find all device logs for public devices
  Device.find({ 'roles.isPublic': true })
    .then(devices => {
      // Collect all the device IDs from the isPublic field
      const deviceIds = devices.map(device => {
        return device._id;
      });

      // Find logs for the device IDs from above
      Weather.find({ device: { $in: deviceIds } }).then(logs => {
        logs
          .find({
            $and: [{ date: { $gte: startDate } }, { date: { $lte: endDate } }]
          })
          .then(datedLogs => res.json(datedLogs));
      });
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.data_favorite_get = (req, res) => {
  // Find all device logs for public devices
  User.findById(req.user.id)
    .then(user => {
      Device.findById(user.favoriteDevice)
        .then(device => {
          Weather.find({ device: device._id })
            .sort({ date: -1 })
            .limit(10)
            .then(favoritedata => res.json(favoritedata));
        })
        .catch(err => {
          console.log(err);
          errors.favoriteDevice =
            'The user has not favorited a device or the device no longer exists';
          return res.status(500).json(errors);
        });
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};
