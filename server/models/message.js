'use strict';

// Message model

export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Message can not be empty'
        }
      }
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    readby: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  });
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'userId' });
    Message.belongsTo(models.Group, { foreignKey: 'groupId' });
  };
  return Message;
};
