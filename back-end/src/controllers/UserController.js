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

const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const data = await userService.register(name, email, password);
        return res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    register,
};
