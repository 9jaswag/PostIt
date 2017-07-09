'use strict';
/*module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return User;
};*/

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  });
  
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};