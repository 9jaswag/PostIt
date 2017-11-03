const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Users', [
      {
        username: 'user1',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(7)),
        email: 'user1@gmail.com',
        phone: 2348012345678,
        resetToken: null,
        resetTime: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user2',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(7)),
        email: 'user2@gmail.com',
        phone: 2348012345679,
        resetToken: null,
        resetTime: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user3',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(7)),
        email: 'user3@gmail.com',
        phone: 2348012345670,
        resetToken: null,
        resetTime: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
