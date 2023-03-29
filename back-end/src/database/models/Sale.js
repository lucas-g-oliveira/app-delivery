
module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    'Sale',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Datatypes.INTEGER,
      },
      userId: {
        allowNull: false,
        references:{ model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Datatypes.INTEGER,
      },
      sellerId:{
        allowNull: false,
        references:{ model: 'users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Datatypes.INTEGER,
      },
      totalPrice: Datatypes.DECIMAL(9,2),
      deliveryAddress: Datatypes.STRING,
      deliveryNumber: Datatypes.STRING,
      saleDate: {defaultValue: sequelize.NOW, type: Datatypes.DATE },
      status: Datatypes.STRING,
    },
    {
      timestamp: false,
      tableName: 'sales',
      underscored: true,
      defaultScope: { attributes: { exclude: ['password'] } },
    }
  );

  User.associate = (models) => { User.hasMany(models.Sales, {foreignKey: 'userId'}) } 

  return User;
};