const { saleService } = require('../services');

const register = async (req, res, next) => {
    const { userId } = req.user;
    console.log(req.user);
    const { totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
    try {
        await saleService.register(userId, totalPrice, deliveryAddress, deliveryNumber, products);
        return res.status(201).json();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
};
