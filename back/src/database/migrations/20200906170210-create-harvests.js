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
      millId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{ model: 'Mills', key:'id'},
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
