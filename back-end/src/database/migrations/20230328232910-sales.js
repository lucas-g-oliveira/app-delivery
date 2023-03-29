'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'sales',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          field: 'id',
        },
        userId: {
          allowNull: false,
          references:{ model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
          field: 'user_id',
        },
        sellerId:{
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
          field: 'seller_id',
          references: {model: 'users', key: 'id'},
        },
        totalPrice: Sequelize.DECIMAL(9,2),
        deliveryAddress: Sequelize.STRING,
        deliveryNumber: Sequelize.STRING,
        saleDate: {defaultValue: Sequelize.NOW, type: Sequelize.DATE },
        status: Sequelize.STRING,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
