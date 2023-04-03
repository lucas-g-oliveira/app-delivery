module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      price:{
        type: DataTypes.DECIMAL(4,2),
        allowNull: false,
      },
      urlImage:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored:true,
      tableName: 'products',
      timestamps: false,
    }
  );

  Product.associate = (models) => { Product.hasMany(models.SalesProduct) }
  Product.associate = (models) => { Product.belongsToMany(models.Sale, { through: models.SalesProduct }) }


  return Product;
};