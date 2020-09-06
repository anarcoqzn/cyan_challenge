'use strict';

const { primaryKeyAttribute } = require("../../models/Farm");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fields', {
      code:{ 
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      coordinates:{
        type: Sequelize.GEOMETRY('Point'),
        allowNull:false
      },
      farmCode:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{ model:'Farms', key:'code'},
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
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
    await queryInterface.dropTable('Fields');
  }
};
