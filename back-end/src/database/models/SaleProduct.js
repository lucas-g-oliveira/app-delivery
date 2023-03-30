
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
    {
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
    },
    {
      timestamps: false,
      primaryKey: true,
      unique: true,
      fields: ['sale_id', 'product_id']
    });

  SaleProduct.associate = (models) => { SaleProduct.belongsTo(models.Sale, { foreignKey: 'saleId' }) }
  SaleProduct.associate = (models) => { SaleProduct.belongsTo(models.Product, { foreignKey: 'productId' }) }

  return SaleProduct;
};

