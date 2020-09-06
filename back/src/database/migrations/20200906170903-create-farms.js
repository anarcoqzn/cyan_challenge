'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Farms', { 
      code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      harvestCode:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Harvests', key: 'code'},
        onUpdate: 'CASCADE',
        onDelete:'CASCADE'
      },
      createdAt:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Farms');
  }
};
