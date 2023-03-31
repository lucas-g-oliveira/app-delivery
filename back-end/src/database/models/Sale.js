
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
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
      },
      sellerId: {
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
      },
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: { defaultValue: sequelize.NOW, type: DataTypes.DATE },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pendente'
      },
    },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    }
  );

  Sale.associate = (models) => { Sale.belongsTo(models.User, { foreignKey: 'userId' }) }
  Sale.associate = (models) => { Sale.belongsTo(models.User, { foreignKey: 'sellerId' }) }

  return Sale;
};