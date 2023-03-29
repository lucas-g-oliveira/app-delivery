
module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Datatypes.INTEGER,
      },
      name: Datatypes.STRING,
      email: Datatypes.STRING,
      password: Datatypes.STRING,
      role: Datatypes.STRING
    },
    {
      timestamp: false,
      tableName: 'users',
      underscored: true,
      defaultScope: { attributes: { exclude: ['password'] } },
    }
  );

  User.associate = (models) => { User.hasMany(models.Sales, {foreignKey: 'userId'}) } 
  User.associate = (models) => { User.hasMany(models.Sales, {foreignKey: 'sellerId'}) } 


  return User;
};