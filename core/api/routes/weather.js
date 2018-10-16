const express = require("express");
const router = express.Router();
const passport = require("passport");

var weatherController = require("../controllers/weather");

// @route   POST api/weather/log
// @desc    Add weather log to the database
// @access  Public
router.post("/log", weatherController.log_post);

// @route   GET api/weather/log
// @desc    Get all weather logs for devices owned by the user
// @access  Private
router.get(
  "/log",
  passport.authenticate("jwt", { session: false }),
  weatherController.log_get
);

// @route   GET api/weather/data/mine
// @desc    Get all weather data where you're an authorized user
// @access  Private
router.get(
  "/data/mine",
  passport.authenticate("jwt", { session: false }),
  weatherController.data_mine_get
);

// @route   GET api/weather/data/public
// @desc    Get all weather data that's public
// @access  Private
router.get(
  "/data/public",
  passport.authenticate("jwt", { session: false }),
  weatherController.data_public_get
);

// @route   GET api/weather/data
// @desc    Get all weather data
// @access  Public
router.get("/lastlogs", weatherController.alldevices_lastlog_get);

module.exports = router;
