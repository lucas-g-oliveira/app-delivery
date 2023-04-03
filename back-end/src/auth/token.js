const jwt = require('jsonwebtoken');
require('dotenv').config();
const { errorStatus, customError } = require('../utils/errors');

const secret = 'secret_key';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const encript = (data) => jwt.sign(data, secret, jwtConfig);

const decript = (token) => {
  if (!token) throw customError(errorStatus.IS_REQUIRED, 'Token not found');

  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (err) {
    throw customError(errorStatus.UNAUTHORIZED, 'Expired or invalid token');
  }
};

const newToken = (user) => {
  const token = encript({ email: user.email, role: user.role, userId: user.id });
  return token;
};

module.exports = { encript, decript, newToken };