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
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
          field: 'user_id',
        },
        sellerId:{
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          type: Sequelize.INTEGER,
          field: 'seller_id',
          references: {model: 'users', key: 'id'},
        },
        totalPrice: {
          type: Sequelize.DECIMAL(9,2),
          field: 'total_price',
        },
        deliveryAddress: {
          type: Sequelize.STRING,
          field: 'delivery_address'
        },
        deliveryNumber: {
          type: Sequelize.STRING,
          field: 'delivery_number'
        },
        saleDate: {
          defaultValue: Sequelize.NOW(), 
          type: Sequelize.DATE, 
          field: 'sale_date'
        },
        status: {
          type: Sequelize.STRING
        },
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};
