const { customError, errorStatus, errorMessages } = require('../utils/errors');

const restrictedToAdmin = (req, _res, next) => {
  const { role } = req.user;
  if (role !== 'administrator') {
    throw customError(errorStatus.UNAUTHORIZED, errorMessages.UNAUTHORIZED_USER);
  }
  next();
};

module.exports = restrictedToAdmin;