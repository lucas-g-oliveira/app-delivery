const { saleService } = require('../services');

const register = async (req, res, next) => {
    const { userId } = req.user;
    const { totalPrice, deliveryAddress, deliveryNumber, products } = req.body;
    try {
        const saleId = await saleService
            .register({ userId, totalPrice, deliveryAddress, deliveryNumber, products });
        return res.status(201).json({ saleId });
    } catch (error) {
        next(error);
    }
};

const order = async (req, res, next) => {
    const { userId } = req.user;
    try {
        const orders = await saleService.order(userId);
        return res.status(200).json({ data: orders });
    } catch (error) {
        next(error);
    }
};

const orderSeller = async (req, res, next) => {
    const { sellerId } = req.user;
    try {
        const orders = await saleService.orderSeller(sellerId);
        return res.status(200).json({ data: orders });
    } catch (error) {
        next(error);
    }
};

const changeStatus = async (req, res, next) => {
    const { id: saleId } = req.params;
    const { role, id: userId } = req.user;
    try {
        await saleService.changeStatus({ userId, role, saleId });
        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    order,
    changeStatus,
    orderSeller,
};
