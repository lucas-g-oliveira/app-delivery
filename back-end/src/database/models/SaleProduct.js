
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SalesProduct',
    {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'sales',
          key: 'id'
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
      }
    },
    {
      underscored: true,
      timestamps: false,
      unique: true,
    });

  SaleProduct.associate = (models) => { SaleProduct.belongsTo(models.Sale, { foreignKey: 'saleId' }) }
  SaleProduct.associate = (models) => { SaleProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'productDetails' }) }

  return SaleProduct;
};

