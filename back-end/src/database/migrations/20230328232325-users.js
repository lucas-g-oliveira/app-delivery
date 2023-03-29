'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    'users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name',
      },
      email:{
        allowNull: false,
        type: Sequelize.STRING,
        field: 'email'
      },
      password:{
        allowNull: false,
        type: Sequelize.STRING,
        field: 'password',
      },
      role:{
        allowNull: false,
        type: Sequelize.STRING,
        field: 'password',
      }
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};