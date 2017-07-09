'use strict';
/*module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    posted_by: DataTypes.STRING,
    to_groupid: DataTypes.INTEGER,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Message;
};*/

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    posted_by: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    to_groupid: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    priority: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  });
  
  Message.associate = (models) => {
    // associations can be defined here
    Message.belongsTo(models.Group);
  };
  return Message;
};