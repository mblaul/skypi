var User = require('../models/User');
var Device = require('../models/Device');
var config = require('../config/keys');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var moment = require('moment');

// Load input validation
const validateRegisterInput = require('../validation/user/register');
const validateLoginInput = require('../validation/user/login');

// Load email templates
const verificationEmail = require('../common/emailTemplates/verificationEmail');
const resetPasswordEmail = require('../common/emailTemplates/resetPasswordEmail');

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
      errors.email = 'Email already exists';
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
          errors.server = 'An error occured, please try again';
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
        errors.email = 'Incorrect username/password combination';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched, create JWT payload
          const payload = {
            id: user.id,
            name: user.name,
            roles: user.roles
          };
          jwt.sign(
            payload,
            config.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                console.log(err);
                errors.server = 'An error occured, please try again';
                return res.status(500).json(errors);
              }
              // User has successfully authenticated, give 'em a token
              return res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.email = 'Incorrect username/password combination';
          return res.status(404).json(errors);
        }
      });
    })
    // If promise rejected then user doesn't exist
    .catch(() => {
      errors.email = 'Incorrect username/password combination';
      return res.status(404).json(errors);
    });
};

module.exports.delete_delete = (req, res) => {
  let errors = {};

  const user = req.user.id;
  const userToDelete = req.params.userId;

  User.findById(user)
    .then(user => {
      if (user.roles.isAdmin || user._id === userToDelete) {
        user.remove();
        return res.json({ message: 'User removed' });
      }
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.verify_get = (req, res) => {
  let errors = {};

  User.findById(req.user.id)
    .then(user => {
      // Check to see if the user exists
      if (!user) {
        return res.json({
          message: 'A verification code will be sent to your email shortly.'
        });
      }

      // User matched, create password reset token
      const verifyUserToken = {
        key: Math.random()
          .toString(36)
          .replace('0.', ''),
        created: moment().format(),
        expireTime: moment(this.created)
          .add(10, 'm')
          .format()
      };

      // Add random verify token to user
      user.tempObjects.verifyUserToken = verifyUserToken;
      user.save().then(user => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'skypi.noreply@gmail.com', // generated ethereal user
            pass: config.secretEmailKey // generated ethereal password
          }
        });

        // Create email body
        const verificationEmailBody = verificationEmail(verifyUserToken.key);

        // setup email data with unicode symbols
        let mailOptions = {
          from: 'skypi.noreply@gmail.com',
          to: user.email,
          subject: 'Verify your account and rule the skies.',
          text: 'Hello',
          html: verificationEmailBody
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
            errors.server = 'An error occured, please try again';
            return res.status(500).json(errors);
          }
          console.log('Message sent: %s', info.messageId);
          return res.json({
            message: 'A verification code will be sent to your email shortly.!'
          });
        });
      });
    })
    // If promise rejected then user doesn't exist
    .catch(() => {
      return res.json({
        message: 'A verification code will be sent to your email shortly.'
      });
    });
};

module.exports.verify_post = (req, res) => {
  let errors = {};

  const verifyUserToken = req.body.verifyusertoken;

  User.findById(req.user.id)
    .then(user => {
      existingToken = user.tempObjects.verifyUserToken;
      if (
        existingToken.expireTime < moment().format() ||
        existingToken.key !== verifyUserToken
      ) {
        errors.verifyusertoken = 'Verification code not valid';
        return res.status(404).json(errors);
      }

      user.roles.isVerified = true;
      user.tempObjects.verifyUserToken = undefined;

      user.save().then(user => {
        return res.json({ message: 'Verification complete, thanks!' });
      });
    })
    // If promise rejected then user doesn't exist
    .catch(err => {
      console.log(err);
      errors.verifyusertoken = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.changepassword_post = (req, res) => {
  let errors = {};

  const email = req.body.email;

  User.findOne({ email: email })
    .then(user => {
      // Check to see if the user exists
      if (!user) {
        return res.json({
          message: 'An email to reset your password will be sent shortly.'
        });
      }
      // User matched, create password reset token
      const passwordResetToken = {
        key: Math.random()
          .toString(36)
          .replace('0.', ''),
        created: moment().format(),
        expireTime: moment(this.created)
          .add(10, 'm')
          .format()
      };

      // Add random password token to user
      user.tempObjects.passwordResetToken = passwordResetToken;
      user.save().then(user => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'skypi.noreply@gmail.com', // generated ethereal user
            pass: config.secretEmailKey // generated ethereal password
          }
        });

        // Create email body
        const resetPasswordEmailBody = resetPasswordEmail(
          passwordResetToken.key
        );

        // setup email data with unicode symbols
        let mailOptions = {
          from: 'skypi.noreply@gmail.com',
          to: user.email,
          subject: 'Password reset request',
          text: 'Hello',
          html: resetPasswordEmailBody
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
            errors.server = 'An error occured, please try again';
            return res.status(500).json(errors);
          }
          console.log('Message sent: %s', info.messageId);
          return res.json({
            message: 'An email to reset your password will be sent shortly.'
          });
        });
      });
    })
    .catch(() => {
      return res.json({
        message: 'An email to reset your password will be sent shortly.'
      });
    });
};

module.exports.resetpassword_post = (req, res) => {
  let errors = {};

  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const passwordResetToken = req.body.passwordresettoken;

  if (password !== password2) {
    errors.password2 = 'Your passwords do not match';
    return res.status(500).json(errors);
  }

  User.findOne({ email })
    .then(user => {
      existingToken = user.tempObjects.passwordResetToken;
      if (
        existingToken.expireTime < moment().format() ||
        existingToken.key !== passwordResetToken
      ) {
        errors.verifyusertoken = 'Reset code not valid';
        return res.status(404).json(errors);
      }
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          errors.server = 'An error occured, please try again';
          return res.status(500).json(errors);
        }
        bcrypt.hash(password, salt, (err, hashedpassword) => {
          if (err) return err;
          user.password = hashedpassword;
          user
            .save()
            .then(() => {
              return res.json({
                message: 'Your password has been reset'
              });
            })
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.favoritedevice_get = (req, res) => {
  let errors = {};

  const device = req.params.deviceId;

  User.findById(req.user.id)
    .then(user => {
      Device.findById(device)
        .then(device => {
          user.favoriteDevice = device._id;
          user.save().then(user => {
            return res.json(user);
          });
        })
        .catch(() => {
          errors.device = 'Device not found, please try again';
          return res.status(500).json(errors);
        });
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};

module.exports.preferences_post = (req, res) => {
  let errors = {};

  const preferences = req.body.preferences;

  User.findById(req.user.id)
    .then(user => {
      user.preferences = preferences;
      user.save();
      return res.json(user);
    })
    .catch(err => {
      console.log(err);
      errors.server = 'An error occured, please try again';
      return res.status(500).json(errors);
    });
};
