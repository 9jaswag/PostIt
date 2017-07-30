/**
 * Group controller
 * handles all group related tasks
 */
import models from '../models';

export default {
  create(req, res) {
    if (!req.body.name || req.body.name.trim() === '') {
      return res.status(400)
        .send({ status: false,
          error: { message: 'Please choose a group name' } });
    } else if (!req.decoded.userUsername) {
      return res.status(400)
        .send({ status: false,
          error: { message: 'Please enter a group owner' } });
    } else if (!req.body.description || req.body.description.trim() === '') {
      return res.status(400)
        .send({ status: false,
          error: { message: 'Please enter a description of the group' } });
    }
    models.Group.findOne({
      where: {
        name: req.body.name
      }
    }).then((group) => {
      if (group) {
        return res.status(400)
          .send({ status: false,
            error: { message: 'Group name already exists' } });
      }
    });
    return models.Group
      .create({
        name: req.body.name,
        owner: req.decoded.userUsername,
        description: req.body.description
      })
      .then((group) => {
        return models.UserGroup
          .create({
            userId: req.decoded.userId,
            groupId: group.id
          })
          .then(usergroup => res.status(201).send({
            status: true,
            message: 'Your group has been created and you have been added to the group',
            data: { group, usergroup }
          }))
          .catch(error => res.status(400).send({
            status: false,
            error: { message: error.message }
          }));
      })
      .catch(error => res.status(400).send({
        status: false,
        error: { message: error.message }
      }));
  },
  addUser(req, res) {
    if (!req.body.userId || req.body.userId.trim() === '') {
      return res.status(400)
        .send({ status: false, error: { message: 'a User ID is required' } });
    } else if (!req.params.group_id || req.params.group_id.trim() === '') {
      return res.status(400)
        .send({ status: false, message: 'a Group ID is required' });
    }
    models.Group.findOne({
      where: {
        id: req.params.group_id
      }
    }).then((group) => {
      if (!group) {
        return res.status(401)
          .send({ status: false, error: { message: 'Group does not exist' } });
      }
      models.User.findOne({
        where: {
          id: req.body.userId
        }
      }).then((user) => {
        if (!user) {
          return res.status(401)
            .send({ status: false, error: { message: 'User does not exist' } });
        }
      });
      return models.UserGroup
        .findOne({
          where: {
            userId: req.body.userId,
            groupId: req.params.group_id
          }
        })
        .then((user) => {
          if (user) {
            return res.status(400).send({ status: false,
              error: { message: 'User already belongs to this group' } });
          }
          models.UserGroup.create({
            userId: req.body.userId,
            groupId: req.params.group_id
          }).then(usergroup => res.status(201).send({
            status: true,
            message: 'User successfully added to group',
            data: { usergroup }
          }))
            .catch(error => res.status(400).send({
              status: false,
              error: { message: error.message }
            }));
        })
        .catch(error => res.status(400).send({
          status: false,
          error: { message: error.message }
        }));
    });
  },
  postMessage(req, res) {
    if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400).send({ status: false,
        error: { message: 'Message can not be empty' } });
    } else if (!req.body.priority || req.body.priority.trim() === '') {
      return res.status(400).send({ status: false,
        error: { message: 'Choose a message priority' } });
    } else if (!req.decoded.userUsername || req.body.priority.trim() === '') {
      return res.status(400).send({ status: false,
        error: { message: 'Message must have an author' } });
    } else if (!req.decoded.userId || req.body.priority.trim() === '') {
      return res.status(400).send({ status: false,
        error: { message: 'Message must have a User ID' } });
    }
    models.Group.findOne({
      where: {
        id: req.params.group_id
      }
    }).then((group) => {
      if (!group) {
        return res.status(401).send({ status: false,
          error: { message: 'That group does not exist' } });
      } else {
        return models.Message
          .create({
            message: req.body.message,
            priority: req.body.priority,
            author: req.decoded.userUsername,
            groupId: req.params.group_id,
            userId: req.decoded.userId
          })
          .then(message => res.status(201).send({
            status: true,
            message: 'Message sent',
            data: { message }
          }))
          .catch(error => res.status(400).send({
            status: false,
            error: { message: error.message }
          }));
      }
    })
      .catch(error => res.status(400).send({
        status: false,
        message: error.message
      }));
  },
  fetchMessage(req, res) {
    models.Group.findOne({
      where: {
        id: req.params.group_id
      }
    }).then((group) => {
      if (!group) {
        return res.status(404).send({ status: false,
          error: { message: 'Group does not exist' } });
      } else {
        return models.Message
          .findAll({
            where: {
              groupId: req.params.group_id
            }
          })
          .then(message => res.status(200).send({ data: message }))
          .catch(error => res.status(400).send({
            status: false,
            error: { message: error.message }
          }));
      }
    });
  }
};
