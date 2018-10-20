const express = require('express');
const router = express.Router();
const passport = require('passport');

var deviceController = require('../controllers/device');

// Verify user has a verified email
const verifyIsVerified = require('../middleware/roleVerification/verifyIsVerified');

// Verify user is an authorized user of the device
const verifyDeviceUser = require('../middleware/verifyDeviceUser');

// @route   POST api/device/register
// @desc    Add a new device to the database
// @access  Private
router.post(
  '/register',
  passport.authenticate('jwt', { session: false }),
  verifyIsVerified,
  deviceController.register_post
);

// @route   GET api/device/log
// @desc    Get all device logs from the database
// @access  Private / Admin only
router.get(
  '/log',
  passport.authenticate('jwt', { session: false }),
  verifyIsVerified,
  deviceController.log_get
);

// @route   GET api/device/log/:deviceId
// @desc    Get any one device's logs from the database
// @access  Private / Device user's and admin only
router.get(
  '/log/:deviceId',
  passport.authenticate('jwt', { session: false }),
  verifyIsVerified,
  verifyDeviceUser,
  deviceController.onedevice_log_get
);

// @route   POST api/device/log
// @desc    Add device log to the database
// @access  Public
router.post('/log', deviceController.log_post);

// @route   POST api/device/public
// @desc    Get all public devices
// @access  Private
router.get(
  '/public',
  passport.authenticate('jwt', { session: false }),
  verifyIsVerified,
  deviceController.public_devices_get
);

module.exports = router;
