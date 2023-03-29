const { userService } = require('../services');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await userService.login(email, password);
        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
};
