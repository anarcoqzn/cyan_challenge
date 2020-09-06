'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mills', { 
      name:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      userCpf:{
        type: Sequelize.STRING(11),
        allowNull: false,
        references: { model: 'Users', key: 'cpf' },
        onUpdate:'CASCADE',
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
    await queryInterface.dropTable('Mills');
  }
};
