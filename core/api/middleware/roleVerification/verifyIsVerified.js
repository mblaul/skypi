User = require('../models/User');

module.exports = verifyIsVerify = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (user.roles.isVerified) {
        return next();
      }
    })
    .catch(() => {
      return res.status(401).send('Unauthorized');
    });
};
