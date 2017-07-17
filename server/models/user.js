'use strict';

export default (sequelize, DataTypes) => {
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
      validate: {
        not: ['[a-z]', 'i'],
        notEmpty: true
      }
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
