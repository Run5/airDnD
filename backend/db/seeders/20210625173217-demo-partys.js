'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Party_members', [
      {
        character_id: 1,
        session_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        character_id: 2,
        session_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        character_id: 3,
        session_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        character_id: 1,
        session_id: 2,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        character_id: 2,
        session_id: 2,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        character_id: 3,
        session_id: 2,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        character_id: null,
        session_id: 2,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        character_id: null,
        session_id: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        character_id: null,
        session_id: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        character_id: null,
        session_id: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
      {
        character_id: null,
        session_id: 3,
        createdAt: new Date,
        updatedAt: new Date,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Party_members', null, {});
  }
};
