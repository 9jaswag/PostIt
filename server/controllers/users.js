/**
 * User controller
 * handles every user related task
 */

const User = require('../models').User;
const bcrypt = require('bcrypt');


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  signup (req, res) {
    return User
      .create({
        username:req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        email: req.body.email
      })
      .then(user => res.status(201).send({
        success: true,
        username: user.username,
        email: user.email
      }))
      .catch(error => res.status(400).send(error));
  },
  login (req, res) {
    return User
    .findOne({
      where: {
        username: req.body.username,
      }
    }).then(user => {
      if (!user) {
        return res.status(401).send({success: false, message: "Username not found"})
      }
        return res.status(200).send({success: true, message: "You're signed in"})
    })
  },
  allUsers (req, res) {
    return User
      .all()
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }
}