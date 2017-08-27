import models from '../server/models';

/**
 * Function to get the emails of the users in a group
 * @param {number} groupId id of the group
 * @return {promise} an array of users and their email addresses.
 */
const getUserEmails = groupId =>
  new Promise((resolve) => {
    models.Group.findOne({
      where: {
        id: groupId
      },
      attributes: ['id']
    })
      .then((group) => {
        group.getUsers({ attributes: ['id', 'username', 'email', 'phone'] })
          .then((users) => {
            resolve(users);
          });
      });
  });

export default getUserEmails;
