/**
 * User controller
 * handles every user related task
 */

const User = require('../models').User;

module.exports = {
  signup (req, res) {
    return User
      .create({
        username:req.body.username,
        password: req.body.password,
        email: req.body.password
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  login (req, res) {
    return User
    .findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  }
}