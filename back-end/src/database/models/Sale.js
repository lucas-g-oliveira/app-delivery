
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
        filed: "user_id"
      },
      sellerId: {
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: DataTypes.INTEGER,
        field: "seller_id"
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
      },
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      // saleDate: { defaultValue: sequelize.NOW, type: DataTypes.DATE },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Pendente'
      },
    },
    {
      timestamps: true,
      updatedAt:false,
      createdAt: 'saleDate',
      tableName: 'sales',
      underscored: true,
    }
  );

  Sale.associate = (models) => { Sale.belongsTo(models.User, { foreignKey: 'userId' }) }
  Sale.associate = (models) => { Sale.belongsTo(models.User, { foreignKey: 'sellerId' }) }
  Sale.associate = (models) => { Sale.hasMany(models.SalesProduct, { foreignKey: 'saleId', as: "saleProducts" }) }


  return Sale;
};