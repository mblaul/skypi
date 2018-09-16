const express = require("express");
const router = express.Router();
const passport = require("passport");

var userController = require("../controllers/user");

// @route   GET api/user/current
// @desc    Return current user
// @access  Private
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	userController.current_get
);

// @route   POST api/user/register
// @desc    Register user
// @access  Public
router.post("/register", userController.register_post);

// @route   POST api/user/login
// @desc    Login user / Returning JWT token
// @access  Public
router.post("/login", userController.login_post);

// @route   	POST api/user/resetpassword
// @desc   		Send token to user's email to reset password
// @access	Public
router.post(
	"/resetpassword",
	// passport.authenticate("jwt", { session: false }),
	userController.resetpassword_post
);

module.exports = router;
