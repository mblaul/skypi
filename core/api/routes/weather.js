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

// @route   GET api/weather/data
// @desc    Get all weather data
// @access  Public
router.get('/data', weatherController.data_get);

// @route   GET api/weather/data
// @desc    Get all weather data
// @access  Public
router.get('/lastlogs', weatherController.alldevices_lastlog_get);

module.exports = router;
