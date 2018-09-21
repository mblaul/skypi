const express = require('express');
const router = express.Router();
const passport = require('passport');

var deviceController = require('../controllers/device');

const verifyDeviceUser = require('../middleware/verifyDeviceUser');

// @route   POST api/device/register
// @desc    Add a new device to the database
// @access  Private
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  deviceController.register_post
);

// @route   GET api/device/log
// @desc    Get all device logs from the database
// @access  Private / Admin only
router.get(
  '/log',
  passport.authenticate('jwt', { session: false }),
  deviceController.log_get
);

// @route   GET api/device/log/:deviceId
// @desc    Get any one device's logs from the database
// @access  Private / Device user's and admin only
router.get(
  '/log/:deviceId',
  passport.authenticate('jwt', { session: false }),
  verifyDeviceUser,
  deviceController.onedevice_log_get
);

// @route   POST api/device/log
// @desc    Add device log to the database
// @access  Public
router.post('/log', deviceController.log_post);

module.exports = router;
