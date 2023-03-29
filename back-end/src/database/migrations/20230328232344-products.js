'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'products',
      {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true
        },
        name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        price:{
          type: Sequelize.DECIMAL(4,2),
          allowNull: false,
        },
        urlImage:{
          type: Sequelize.STRING,
          allowNull: false,
        },
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
