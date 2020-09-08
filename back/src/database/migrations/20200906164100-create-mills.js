'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Mills', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      name:{
        type: Sequelize.STRING,
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
