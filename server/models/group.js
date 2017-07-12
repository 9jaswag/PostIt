

/* module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Group;
};*/

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Group already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Group name can not be empty'
        }
      }
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Group must have an owner'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Group description can not be empty'
        }
      }
    }
  });
  Group.associate = (models) => {
    // associations can be defined here
    Group.hasMany(models.Message, { foreignKey: 'groupId' });
    // Group.belongsToMany(models.User);
  };
  return Group;
};
