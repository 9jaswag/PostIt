
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Messages', [
      {
        title: 'Message 1',
        message: 'Message content',
        priority: 'normal',
        author: 'user1',
        readby: '{"user1"}',
        groupId: 1,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Message 2',
        message: 'Message content',
        priority: 'normal',
        author: 'user2',
        readby: '{"user2"}',
        groupId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Message 3',
        message: 'Message content',
        priority: 'normal',
        author: 'user3',
        readby: '{"user3"}',
        groupId: 3,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
