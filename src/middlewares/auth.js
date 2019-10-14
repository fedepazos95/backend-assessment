const jwt = require('express-jwt');
const config = require('../config');

const isAuthenticated = (roles = []) => {
  // roles param can be a single role string or an array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    jwt({ secret: config.secretKey }),
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(401)
          .json({
            message: 'User is not authorized to perform this request.'
          });
      }
      next();
    }
  ]
}

module.exports = {
  isAuthenticated
};