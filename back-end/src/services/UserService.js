const md5 = require('md5');
const { User } = require('../database/models');
const { customError, errorStatus, errorMessages } = require('../utils/errors');
const { encript } = require('../auth/token');
// const { passwordCheck } = require('../auth/passwordCript');

const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);
  const isValidPass = md5(password) === user.password;
  if (!isValidPass) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);
  const token = encript({ email: user.email });
  return { token, role: user.role, name: user.name };
};

module.exports = {
  login,
};