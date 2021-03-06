
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      unique: true,
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
      validate: {
        not: ['[a-z]', 'i'],
        notEmpty: true
      }
    },
    resetToken: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    resetTime: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
