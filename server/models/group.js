'use strict';
/*module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    create_by: DataTypes.STRING
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
    create_by: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  });
  
  Group.associate = (models) => {
    // associations can be defined here
  };
  return Group;
};