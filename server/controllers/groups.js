/**
 * Group controller
 * handles all group related tasks
 */
const Group = require('../models').Group;
const UserGroup = require('../models').UserGroup;
const Message = require('../models').Message;

module.exports = {
  // Method to create a group
  create(req, res) {
    return Group
      .create({
        name: req.body.name,
        owner: req.body.owner,
        description: req.body.description
      })
      .then(group => res.status(201).send(group))
      .catch(error => res.status(400).send(error.message));
  },
  // Method to add a user to a group
  addUser(req, res) {
    return UserGroup
      .findOne({
        where: {
          user_id: req.body.user_id,
          group_id: req.params.group_id
        }
      })
      .then((user) => {
        if (user) {
          return res.status(400).send({ success: false,
            message: 'User already belongs to this group' });
        }
        UserGroup.create({
          user_id: req.body.user_id,
          group_id: req.params.group_id
        }).then(usergroup => res.status(201).send(usergroup))
          .catch(error => res.status(400).send(error.message));
      })
      .catch(error => res.status(400).send(error.message));
  },
  postMessage(req, res) {
    if (!req.body.message) {
      return res.status(400).send({ success: false,
        message: 'Message can not be empty' });
    } else if (!req.body.priority) {
      return res.status(400).send({ success: false,
        message: 'Choose a message priority' });
    } else if (!req.body.author) {
      return res.status(400).send({ success: false,
        message: 'Choose an author' });
    }

    return Message
      .create({
        message: req.body.message,
        priority: req.body.priority,
        author: req.body.author,
        groupId: req.params.group_id,
        userId: req.body.user_id // not done
      })
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error.message));
  },
  // Method to retrieve messages based on groups
  fetchMessage(req, res) {
    return Message
      .findAll({
        where: {
          groupId: req.params.group_id // not done
        }
      })
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
  }
};

