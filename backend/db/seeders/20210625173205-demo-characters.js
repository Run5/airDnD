'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characters', [
      {
        name: 'Luci',
        user_id: 1,
        race: 'Feral Tiefling',
        class: 'Warlock',
        level: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Elfo',
        user_id: 2,
        race: 'Half-Elf',
        class: 'Bard',
        level: 2,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        name: 'Tiabeanie',
        user_id: 3,
        race: 'Human',
        class: 'Fighter',
        level: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
