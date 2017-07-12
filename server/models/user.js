'use strict';

/* module.exports = (sequelize, DataTypes) => {
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists'
      },
      validate: {
        is: /^[a-z]+$/i,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 500],
          msg: 'Password length must be between 6 and 30'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email can not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Enter a valid email address'
        }
      }
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    // User.belongsToMany(models.Group);
  };
  return User;
};
