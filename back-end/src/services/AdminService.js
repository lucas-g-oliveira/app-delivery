const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');
const { customError, errorStatus, errorMessages } = require('../utils/errors');
const { newToken } = require('../auth/token');

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

const findAll = async () => {
  const users = await User.findAll();
  return users;
};

const registerUser = async (name, email, password, role) => {
  await userExist(name, email);

  const passwordCrypt = md5(password);
  const newUser = await User.create({ name, email, password: passwordCrypt, role });
  const token = newToken(newUser);

  return { token, role: newUser.role, name: newUser.name };
};

const deleteUser = async ({ userIdToDelete }) => {
  try {
    await User.destroy({ where: { id: userIdToDelete } });
  } catch (erro) {
    throw new Error('could not delete');
  }
};

module.exports = { registerUser, findAll, deleteUser };