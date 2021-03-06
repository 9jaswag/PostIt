
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Messages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    priority: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    readby: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    groupId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      reference: {
        model: 'Group',
        key: 'id',
        as: 'groupId',
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false,
      reference: {
        model: 'User',
        key: 'id',
        as: 'userId',
      }
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Messages')
};
