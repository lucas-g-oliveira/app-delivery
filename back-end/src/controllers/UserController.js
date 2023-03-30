const { userService } = require('../services');

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const data = await userService.login(email, password);
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
};
