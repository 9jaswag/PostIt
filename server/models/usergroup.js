
export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  UserGroup.associate = (models) => {
    // associations can be defined here
    // UserGroup.hasMany(models.User, { foreignKey: 'userId' });
    // UserGroup.hasMany(models.group, { foreignKey: 'groupId' });
  };
  return UserGroup;
};
