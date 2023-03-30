const { hash, compare } = require('bcrypt');

const passwordEncrytp = async (password) => {
  const handleSaltHashBytes = Math.trunc(Math.random() * 7) + 10;
  const passwordHash = await hash(password, handleSaltHashBytes);
  return passwordHash;
};

const passwordCheck = async (password, hashPassword) => {
  const result = await compare(password, hashPassword);
  return result;
};

module.exports = { passwordEncrytp, passwordCheck };