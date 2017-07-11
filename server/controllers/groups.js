/**
 * Group controller
 * handles all group related tasks
 */
const Group = require('../models').Group;
const UserGroup = require('../models').UserGroup;

module.exports = {
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
  addUser(req, res) {
    return UserGroup
      .create({
        user_id: req.body.user_id,
        group_id: req.params.group_id
      })
      .then(usergroup => res.status(201).send(usergroup))
      .catch(error => res.status(400).send(error));
  },
};

