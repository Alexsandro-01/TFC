'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'matches',
      'in_progress',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'in_progress',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(
      'matches',
      'in_progress',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: Sequelize.NONE,
        field: 'in_progress',
      }
    );
  }
};
