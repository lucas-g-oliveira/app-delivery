const { User } = require('../database/models');
const { customError, errorStatus, errorMessages } = require('../utils/errors');
const { encript } = require('../auth/token');

const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
      password,
    },
  });
  
  if (!user) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);

  return encript({ email: user.email, role: user.role });
};

module.exports = {
  login,
};