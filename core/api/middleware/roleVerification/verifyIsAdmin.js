User = require('../models/User');

module.exports = verifyIsAdmin = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (user.roles.isAdmin) {
        return next();
      }
    })
    .catch(() => {
      return res.status(401).send('Unauthorized');
    });
};
