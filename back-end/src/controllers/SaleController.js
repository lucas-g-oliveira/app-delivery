const { saleService, userService } = require('../services');

const register = async (req, res, next) => {
    const { userId } = req.user;
    const { totalPrice, deliveryAddress, deliveryNumber, products, sellerId } = req.body;
    try {
        const saleId = await saleService
            .register({ userId, totalPrice, deliveryAddress, deliveryNumber, products, sellerId });
        return res.status(201).json({ saleId });
    } catch (error) {
        next(error);
    }
};

const order = async (req, res, next) => {
    const { userId, role } = req.user;
    try {
        const orders = await saleService.order(userId, role);
        return res.status(200).json({ data: orders });
    } catch (error) {
        next(error);
    }
};

const orderById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const orders = await saleService.orderById(id);
        const { name } = await userService.getUserById(orders.sellerId);
        return res.status(200).json({ data: { orders, name } });
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

const detailsOrder = async (req, res, next) => {
    const { id: saleId } = req.params;
    try {
        const details = await saleService.detailsOrder({ saleId });
        return res.status(200).json({ data: details });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    order,
    changeStatus,
    orderSeller,
    detailsOrder,
    orderById,
};
