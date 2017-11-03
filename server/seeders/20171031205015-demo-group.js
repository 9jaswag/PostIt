
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Groups', [
      {
        name: 'Group 1',
        owner: 'user1',
        description: 'a group',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Group 2',
        owner: 'user2',
        description: 'a group',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Group 3',
        owner: 'user3',
        description: 'a group',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
