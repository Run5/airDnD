'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sessions', [
      {
        host_id: 1,
        name: 'Greatest DnD session',
        description: 'Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet, consectetur, adipisci[ng] velit, sed quia non numquam [do] eius modi tempora inci[di]dunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?',
        location: 'N/A',
        map: 'https://i2.wp.com/www.fantasticmaps.com/wp-content/uploads/2015/12/2.jpg',
        party_max_size: 3,
        public: true,
        in_person: false,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        host_id: 1,
        name: "Tod's Session",
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
        location: 'N/A',
        map: 'https://i1.wp.com/www.fantasticmaps.com/wp-content/uploads/2015/12/5.jpg',
        party_max_size: 4,
        public: true,
        in_person: false,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        host_id: 1,
        name: "All welcome!",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        location: 'N/A',
        map: 'https://i0.wp.com/www.fantasticmaps.com/wp-content/uploads/2010/06/Attachment-1.jpeg',
        party_max_size: 5,
        public: true,
        in_person: false,
        createdAt: new Date,
        updatedAt: new Date
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sessions', null, {});
  }
};
