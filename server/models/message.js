'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    message: DataTypes.STRING,
    posted_by: DataTypes.STRING,
    to_groupid: DataTypes.INTEGER,
    priority: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Message;
};