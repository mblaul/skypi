const express = require('express');
const router = express.Router();
const passport = require('passport');

var userController = require('../controllers/user');

// @route   GET api/user/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  userController.current_get
);

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post('/register', userController.register_post);

// @route   POST api/user/login
// @desc    Login user / Returning JWT token
// @access  Public
router.post('/login', userController.login_post);

// @route   	GET api/user/verify
// @desc   		Send user an email to verify their account
// @access		Private
router.get(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  userController.verify_get
);

// @route   	POST api/user/verify
// @desc   		User sends info to verify the account
// @access		Private
router.post(
  '/verify',
  passport.authenticate('jwt', { session: false }),
  userController.verify_post
);

// @route   	POST api/user/resetpassword
// @desc   		Send token to user's email to reset password
// @access	  Public
router.post('/resetpassword', userController.resetpassword_post);

// @route   	POST api/user/changepassword
// @desc   		Send token to user's email to reset password
// @access	  Public
router.post('/changepassword', userController.changepassword_post);

// @route   	POST api/user/favoritedevice
// @desc   		Let user set their favorite device
// @access	  Private
router.post(
  '/favoritedevice',
  passport.authenticate('jwt', { session: false }),
  userController.favoritedevice_post
);

module.exports = router;
