
// UserGroup model

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

  // instance method to verify user is group member before they can perform action in group
  UserGroup.prototype.isGroupMember = function (userId, groupId) {
    UserGroup.findOne({
      where: { userId, groupId }
    }).then((groupMember) => {
      if (!groupMember) {
        return false;
      }
      return true;
    });
  };

  return UserGroup;
};
