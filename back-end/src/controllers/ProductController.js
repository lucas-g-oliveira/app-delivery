const { productService } = require('../services');

const findAll = async (req, res, next) => {
    try {
        const products = await productService.findAll();
        return res.status(200).json({ data: products });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    findAll,
};
