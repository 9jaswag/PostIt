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
    if (!req.body.userId) {
      return res.status(400)
        .send({ status: false, message: 'a User ID is required' });
    } else if (!req.params.group_id) {
      return res.status(400)
        .send({ status: false, message: 'a Group ID is required' });
    }
    return UserGroup
      .findOne({
        where: {
          userId: req.body.userId,
          groupId: req.params.group_id
        }
      })
      .then((user) => {
        if (user) {
          return res.status(400).send({ success: false,
            message: 'User already belongs to this group' });
        }
        UserGroup.create({
          userId: req.body.userId,
          groupId: req.params.group_id
        }).then(usergroup => res.status(201).send({
          status: true,
          message: 'User successfully added to group',
          usergroup
        }))
          .catch(error => res.status(400).send(error.message));
      })
      .catch(error => res.status(400).send(error.message));
  },
  // Method to post a message to a group
  postMessage(req, res) {
    if (!req.body.message) {
      return res.status(400).send({ success: false,
        message: 'Message can not be empty' });
    } else if (!req.body.priority) {
      return res.status(400).send({ success: false,
        message: 'Choose a message priority' });
    } else if (!req.body.author) {
      return res.status(400).send({ success: false,
        message: 'Message must have an author' });
    } else if (!req.body.user_id) {
      return res.status(400).send({ success: false,
        message: 'Message must have a User ID' });
    }

    return Message
      .create({
        message: req.body.message,
        priority: req.body.priority,
        author: req.body.author,
        groupId: req.params.group_id,
        userId: req.body.user_id // not done
      })
      .then(message => res.status(201).send({
        success: true,
        response: 'Message sent',
        message
      }))
      .catch(error => res.status(400).send(error.message));
  },
  // Method to retrieve messages based on groups
  fetchMessage(req, res) {
    return Message
      .findAll({
        where: {
          groupId: req.params.group_id
        }
      })
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
  }
};

