const { User } = require('../database/models');
const { customError, errorStatus, errorMessages } = require('../utils/errors');
const { encript } = require('../auth/token');
const { passwordCheck } = require('../auth/passwordCript');

const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  const isValidPass = passwordCheck(password, user.password);
  if (!user || !isValidPass) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);
  return encript({ email: user.email, role: user.role });
};

module.exports = {
  login,
};