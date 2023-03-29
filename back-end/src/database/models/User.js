module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{ 
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false,
    tableName: 'users',
    defaultScope: { attributes: { exclude: ['password'] } },
  });

  return User;
};