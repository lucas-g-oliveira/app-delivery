const { Op } = require('sequelize');
const db = require('../database/models/index');
const { Sale, SalesProduct, Product } = require('../database/models');
const { customError } = require('../utils/errors');
const saleStatus = require('../utils/saleStatus');

const register = async (saleData) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, products, sellerId } = saleData;
  const t = await db.sequelize.transaction();

  try {
    const sale = await Sale.create({ userId, totalPrice, deliveryAddress, deliveryNumber, sellerId,
    }, { transaction: t });
    const product = products.map((e) => ({ 
      saleId: sale.id, productId: e.productId, quantity: e.quantity, 
    }));
    console.log(product);
    await SalesProduct.bulkCreate(product, { transaction: t });
    await t.commit();
    return sale.id;
  } catch (err) {
    await t.rollback();
    throw new Error(err);
  }
};

const order = async (id, role) => {
  const teste = role === 'seller' ? 'sellerId' : 'userId';
  const orders = Sale.findAll({
    where: { [teste]: id },
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

const orderById = async (id) => {
  const orders = Sale.findByPk(id, {
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

const orderSeller = async (sellerId) => {
  const orders = Sale.findAll({
    where: { [Op.or]: [
      { sellerId },
      { status: saleStatus[0] },
    ] },
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

const changeStatus = async ({ role, saleId }) => {
  const { status } = await Sale.findOne({ where: { saleId } });
  const obj = {
    seller: {
      [saleStatus[0]]: saleStatus[1],
      [saleStatus[1]]: saleStatus[2],
    },
    consumer: { [saleStatus[2]]: saleStatus[3] },
  };

  const change = { status: obj[role][status] };
  if (!change.status) throw customError(400, 'cannot be updated');

  let rows;
  try {
    [rows] = await Sale.update(change, { where: { id: saleId } });
  } catch (error) {
    throw new Error(error);
  }
  if (rows === 0) throw customError(400, 'cannot be updated');
};

const detailsOrder = async ({ saleId }) => {
  const salesProducts = await SalesProduct.findAll({
    where: { saleId },
    include:
      {
        model: Product,
        as: 'productDetails',
        attributes: { exclude: ['urlImage', 'id'] },
      },
  });
  return salesProducts;
};

module.exports = {
  register,
  order,
  changeStatus,
  orderSeller,
  detailsOrder,
  orderById,
};
