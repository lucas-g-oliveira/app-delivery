const decript = require('../auth/token');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  const user = decript(authorization);
  req.user = user;
  next();
};

module.exports = validateToken;