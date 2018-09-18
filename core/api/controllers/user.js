var User = require("../models/User");
var config = require("../config/keys");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

//Load input validation
const validateRegisterInput = require("../validation/user/register");
const validateLoginInput = require("../validation/user/login");

module.exports.current_get = (req, res) => {
	// Route to get who you are using JWTs
	return res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
};

module.exports.register_post = (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = "Email already exists";
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					console.log(err);
					errors.server = "An error occured, please try again";
					return res.status(500).json(errors);
				}
				bcrypt.hash(newUser.password, salt, (err, hashedpassword) => {
					if (err) return err;
					newUser.password = hashedpassword;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
};

module.exports.login_post = (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email })
		.then(user => {
			// Check to see if the user exists
			if (!user) {
				errors.email = "Incorrect username/password combination";
				return res.status(404).json(errors);
			}

			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					// User matched, create JWT payload
					const payload = {
						id: user.id,
						name: user.name
					};
					jwt.sign(
						payload,
						config.secretOrKey,
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) {
								console.log(err);
								errors.server = "An error occured, please try again";
								return res.status(500).json(errors);
							}
							// User has successfully authenticated, give 'em a token
							res.json({
								success: true,
								token: "Bearer " + token
							});
						}
					);
				}
			});
		})
		// If promise rejected then user doesn't exist
		.catch(() => {
			errors.email = "Incorrect username/password combination";
			return res.status(404).json(errors);
		});
};

module.exports.resetpassword_post = (req, res) => {
	let errors = {};

	const email = req.body.email;

	User.findOne({ email: email })
		.then(user => {
			// Check to see if the user exists
			if (!user) {
				return res.json({
					message:
						"A temporary password reset token will be sent to your email address shortly."
				});
			}

			// User matched, create password reset token
			const passwordResetToken = {
				key: Math.random()
					.toString(36)
					.replace("0.", ""),
				created: Date.now(),
				expiresIn: 600
			};
			//Add random password reset value to user
			user.passwordResetToken = passwordResetToken;
			user.save().then(user => {
				// Generate test SMTP service account from ethereal.email
				// Only needed if you don't have a real mail account for testing
				nodemailer.createTestAccount((err, account) => {
					// create reusable transporter object using the default SMTP transport
					let transporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: "skypi.noreply@gmail.com", // generated ethereal user
							pass: config.secretEmailKey // generated ethereal password
						}
					});

					// setup email data with unicode symbols
					let mailOptions = {
						from: "skypi.noreply@gmail.com", // sender address
						to: user.email, // list of receivers
						subject: "Password Reset Token", // Subject line
						text: "Hello", // plain text body
						html: passwordResetToken // html body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, (err, info) => {
						if (err) {
							console.log(err);
							errors.server = "An error occured, please try again";
							return res.status(500).json(errors);
						}
						console.log("Message sent: %s", info.messageId);
						// Preview only available when sending through an Ethereal account
						console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
						return res.json({
							message:
								"A temporary password reset token will be sent to your email address shortly."
						});
						// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
						// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
					});
				});
			});
		})
		// If promise rejected then user doesn't exist
		.catch(() => {
			return res.json({
				message:
					"A temporary password reset token will be sent to your email address shortly."
			});
		});
};

module.exports.changepassword_post = (req, res) => {
	let errors = {};

	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;
	const passwordResetToken = req.body.passwordResetToken;

	if (password !== password2) {
		errors.password = "Your passwords do not match.";
		return res.status(500).json(errors);
	}
	User.findOne({ email })
		.then(user => {
			if (user.passwordResetToken.key === passwordResetToken) {
				bcrypt.genSalt(10, (err, salt) => {
					if (err) {
						console.log(err);
						errors.server = "An error occured, please try again";
						return res.status(500).json(errors);
					}
					bcrypt.hash(password, salt, (err, hashedpassword) => {
						if (err) return err;
						user.password = hashedpassword;
						user
							.save()
							.then(() => {
								return res.json({
									message: "Your password has been reset"
								});
							})
							.catch(err => console.log(err));
					});
				});
			}
		})
		.catch();
};
