const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const SaleProduct = sequelize.define('sales_products', {
  sale_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sales',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false,
  primaryKey: true,
  unique: true,
  fields: ['sale_id', 'product_id']
});

SaleProduct.associate = (models) => { SaleProduct.belongsTo(models.Sale, {foreignKey: 'saleId'}) } 
SaleProduct.associate = (models) => { SaleProduct.belongsTo(models.Product, {foreignKey: 'productId'}) } 

module.exports = SaleProduct;