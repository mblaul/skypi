var User = require("../models/User");
var config = require("../config/keys");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

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
