'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT,
        validate: {
          len: [0, 1000],
        },
      },
      location: {
        type: Sequelize.STRING(255)
      },
      party_max_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      public: {
        type: Sequelize.BOOLEAN,
      },
      in_person: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sessions');
  }
};
