const express = require('express');
const router = express.Router();
const passport = require('passport');

var userController = require('../controllers/user');

// Role verification functions
var verifyIsAdmin = require('../middleware/roleVerification/verifyIsAdmin');

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

// @route   	DELETE api/user/:userId
// @desc   		Allows a user or admin to delete a user's account
// @access	  Private
router.delete(
  '/delete/:userId',
  passport.authenticate('jwt', { session: false }),
  userController.delete_delete
);

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

// @route   	GET api/user/favoritedevice
// @desc   		Let user set their favorite device
// @access	  Private
router.get(
  '/favoritedevice/:deviceId',
  passport.authenticate('jwt', { session: false }),
  userController.favoritedevice_get
);

// @route   	POST api/user/preferences
// @desc   		Set a user's preferences
// @access	  Private
router.post(
  '/preferences',
  passport.authenticate('jwt', { session: false }),
  userController.preferences_post
);

// Admin funcions //

// @route   GET api/user/all
// @desc    Return all users
// @access  Private, Admin
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  verifyIsAdmin,
  userController.all_get
);

module.exports = router;
