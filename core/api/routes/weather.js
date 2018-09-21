const express = require('express');
const router = express.Router();

var weatherController = require('../controllers/weather');

// @route   POST api/weather/log
// @desc    Add weather log to the database
// @access  Public
router.post('/log', weatherController.log_post);

module.exports = router;
