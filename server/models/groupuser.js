'use strict';
module.exports = function(sequelize, DataTypes) {
  var GroupUser = sequelize.define('GroupUser', {
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    checkin: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return GroupUser;
};