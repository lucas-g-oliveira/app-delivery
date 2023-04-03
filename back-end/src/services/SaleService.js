const db = require('../database/models/index');
const { Sale, SalesProduct, Product } = require('../database/models');
const { customError } = require('../utils/errors');
const saleStatus = require('../utils/saleStatus');

const register = async (saleData) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, products } = saleData;
  const t = await db.sequelize.transaction();

  try {
    const sale = await Sale.create({ userId, totalPrice, deliveryAddress, deliveryNumber, 
    }, { transaction: t });
    const product = products.map((e) => ({ 
      saleId: sale.id, productId: e.id, quantity: e.quantity, 
    }));
    await SalesProduct.bulkCreate(product, { transaction: t });
    await t.commit();
    return sale.id;
  } catch (err) {
    await t.rollback();
    throw new Error(err);
  }
};

const order = async (userId) => {
  const orders = Sale.findAll({
    where: { userId },
     include: 
      { 
        model: SalesProduct, 
        as: 'saleProducts', 
        attributes: { exclude: ['saleId', 'SaleId', 'ProductId'] },
        include: { 
          model: Product, 
          as: 'productDetails',
          attributes: { exclude: ['urlImage', 'id'] },
        },
      },
  });

  return orders;
};

const changeStatus = async ({ id, status }) => {
  let rows;
  if (!saleStatus.includes(status)) throw customError(400, 'invalid status');
  try {
    [rows] = await Sale.update({ status }, { where: { id } });
  } catch (error) {
    throw new Error(error);
  }
  if (rows === 0) throw customError(400, 'cannot be updated');
};

module.exports = {
  register,
  order,
  changeStatus,
};
