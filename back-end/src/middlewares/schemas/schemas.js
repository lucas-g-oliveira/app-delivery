const Joi = require('joi');

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const login = Joi.object().keys({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

export default login;