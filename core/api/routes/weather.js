const express = require('express');
const router = express.Router();
const passport = require('passport');

var weatherController = require('../controllers/weather');

// @route   POST api/weather/log
// @desc    Add weather log to the database
// @access  Public
router.post('/log', weatherController.log_post);

// @route   GET api/weather/log
// @desc    Get all weather logs for devices owned by the user
// @access  Private
router.get(
  '/log',
  passport.authenticate('jwt', { session: false }),
  weatherController.log_get
);

// @route   GET api/weather/data/private
// @desc    Get all weather data where you're an authorized user
// @access  Private
router.get(
  '/data/private',
  passport.authenticate('jwt', { session: false }),
  weatherController.data_private_get
);

// @route   POST api/weather/data/public/dates
// @desc    Get all weather data that's public
// @access  Private
router.get(
  '/data/public/dates',
  passport.authenticate('jwt', { session: false }),
  weatherController.data_public_dates_post
);

// @route   GET api/weather/data/favorite
// @desc    Get weather data for the user's favorite device
// @access  Private
router.get(
  '/data/favorite',
  passport.authenticate('jwt', { session: false }),
  weatherController.data_favorite_get
);

// @route   GET api/weather/data/device/:deviceId
// @desc    Get weather data for one device
// @access  Private
router.get(
  '/data/device/:deviceId',
  passport.authenticate('jwt', { session: false }),
  weatherController.data_device_get
);

module.exports = router;
