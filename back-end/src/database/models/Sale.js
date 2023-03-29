
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        references:{ model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
      },
      sellerId:{
        allowNull: false,
        references:{ model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
      },
      totalPrice: DataTypes.DECIMAL(9,2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: {defaultValue: sequelize.NOW, type: DataTypes.DATE },
      status: DataTypes.STRING,
    },
    {
      timestamp: false,
      tableName: 'sales',
      underscored: true,
      defaultScope: { attributes: { exclude: ['password'] } },
    }
  );

  Sale.associate = (models) => { Sale.belongsTo(models.User, {foreignKey: 'userId'}) } 
  Sale.associate = (models) => { Sale.belongsTo(models.User, {foreignKey: 'sellerId'}) }
 
  return Sale;
};