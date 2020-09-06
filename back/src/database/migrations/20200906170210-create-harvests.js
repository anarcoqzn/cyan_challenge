'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Harvests', { 
      code:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false
      },
      start:{
        type: Sequelize.DATE,
        allowNull:false
      },
      end:{
        type: Sequelize.DATE,
        allowNull: false
      },
      millName:{
        type: Sequelize.STRING,
        allowNull: false,
        references:{ model: 'Mills', key:'name'},
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
    await queryInterface.dropTable('Harvests');
  }
};
