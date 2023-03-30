const { Product } = require('../database/models');
// const { customError, errorStatus, errorMessages } = require('../utils/errors');

const findAll = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  findAll,
};