'use strict';
/*module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    checkin: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return GroupUser;
};*/

module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    group_id: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    checkin: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  });
  
  GroupUser.associate = (models) => {
    // associations can be defined here
  };
  return GroupUser;
};