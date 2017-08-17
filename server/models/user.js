'use strict';

// User model

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists'
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 500],
          msg: 'Password length must be more than 6 characters'
        },
        notEmpty: {
          args: true,
          msg: 'Password can not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Phone number already exists'
      },
      validate: {
        not: {
          args: ['[a-z]', 'i'],
          msg: 'Only numeric characters are allowed as phone numbers'
        },
        len: {
          args: [13, 13],
          msg: 'Formatted phone number must have 13 characters'
        },
        notEmpty: true
      }
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetTime: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    User.belongsToMany(models.Group,
      { through: 'UserGroup', foreignKey: 'userId' });
    User.hasMany(models.Message, { foreignKey: 'userId' });
  };
  return User;
};
