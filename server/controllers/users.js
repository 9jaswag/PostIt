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
        email: req.body.email
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  login (req, res) {
    return User
    .findOne({
      where: {username: req.body.username, password:req.body.password}
    }).then(user => {
      if (!user) {
        res.status(401).send({success: false, message: "Username not found"})
      }else if (!password) {
        res.status(401).send({success: false, message: "Password does not match"})        
      }else {
        res.status(200).send({success: true, message: "You're signed in"})
      }
    })
    // .then(user => res.status(201).send(user))
    // .catch(error => res.status(400).send(error));
  },
  allUsers (req, res) {
    return User
      .all()
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }
}