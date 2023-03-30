const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const { customError, errorStatus, errorMessages } = require('../utils/errors');
const { newToken } = require('../auth/token');

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  return user;
};

const login = async (email, password) => {
  const user = await findByEmail(email);
  console.log(user);
  if (!user) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);
  const isValidPass = md5(password) === user.password;
  if (!isValidPass) throw customError(errorStatus.NOT_FOUND, errorMessages.INVALID_FIELDS);

  const token = newToken(user);
  return { token, role: user.role, name: user.name };
};

const userExist = async (name, email) => {
  const user = await User.findOne({
    where: {
    [Op.or]: [
      { name },
      { email },
    ],
  },
  });
  if (user) throw customError(errorStatus.CONFLICT, errorMessages.USER_ALREDY_EXIST);
};

const register = async (name, email, password) => {
  await userExist(name, email);
  const newUser = await User.create({ name, email, password, role: 'custumer' });
  const token = newToken(newUser);
  return { token, role: newUser.role, name: newUser.name };
};

module.exports = {
  login,
  register,
};