const schemas = require('./schemas/schemas');

const loginValidate = (req, _res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error('Some required fields are missing');
    }
    const { error } = schemas.login.validate(req.body);
    if (!error) return next();
    throw new Error('Invalid fields');
  } catch (err) {
    next(err);
  }
};

export default loginValidate;