const { decript } = require('../auth/token');
const { userService } = require('../services');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  
  try {
    const data = decript(token);
    const user = await userService.getUserByEmail(data.email);

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};