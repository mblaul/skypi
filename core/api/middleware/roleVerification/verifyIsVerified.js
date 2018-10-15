var User = require('../../models/User');

module.exports = verifyIsVerified = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!user.roles.isVerified) {
        return res
          .status(401)
          .send('You must verify your email before accessing this route');
      }
      return next();
    })
    .catch(() => {
      return res.status(401).send('Unauthorized');
    });
};
