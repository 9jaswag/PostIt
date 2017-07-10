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
      unique: true,
      validate: {
        is: /^[a-z]+$/i,
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[6, 30],
        msg: "Password length must be between 6 and 30"
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        }
      }
    }
  });
  
  User.associate = (models) => {
    // associations can be defined here
    User.belongsToMany(models.Group, {through: 'UserGroup'});
  };
  return User;
};