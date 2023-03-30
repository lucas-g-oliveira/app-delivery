const { Sale } = require('../database/models');

const register = async (userId, totalPrice, deliveryAddress, deliveryNumber) => {
  const sale = await Sale.create({ userId, totalPrice, deliveryAddress, deliveryNumber });
  return sale;
};

module.exports = {
  register,
};