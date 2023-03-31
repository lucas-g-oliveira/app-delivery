const db = require('../database/models/index');
const { Sale, SalesProduct, Product } = require('../database/models');

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
  } catch (err) {
    await t.rollback();
    throw new Error(err);
  }
  
  return 'Order successfully completed';
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

module.exports = {
  register,
  order,
};
