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
  const isValidPass = md5(password) === user.password;
  if (!user || !isValidPass) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);
  const token = encript({ email: user.email });
  return { token, role: user.role, name: user.name };
};

module.exports = {
  login,
};