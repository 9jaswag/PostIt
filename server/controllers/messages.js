/**
 * Message controller
 * handles every message related task
 */
const Message = require('../models').Message;

module.exports = {
  send (req, res) {
    return Message
      .create({
        message: req.body.message,
        posted_by: req.body.posted_by,
        to_groupid: req.body.to_groupid,
        priority: req.body.priority
      })
      .then(message => res.status(201).send(message))
      .catch(error => res.status(400).send(error));
  },
  fetch (req, res) {
    return Message
      .findAll({
        where: {
          to_groupid: req.body.group_id
        }
      })
  } //not working
}