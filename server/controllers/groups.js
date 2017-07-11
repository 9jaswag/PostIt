/**
 * Group controller
 * handles all group related tasks
 */
const Group = require('../models').Group;

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
  }
  // controller to allow users add other users to groups:
};
