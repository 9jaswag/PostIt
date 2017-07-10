'use strict';
/*module.exports = (sequelize, DataTypes) => {
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
      type:DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  });
  
  Group.associate = (models) => {
    // associations can be defined here
    Group.hasMany(models.Message);
    Group.belongsToMany(models.User, {through: 'UserGroup'});
  };
  return Group;
};