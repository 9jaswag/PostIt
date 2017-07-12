/**
 * User controller
 * handles every user related task
 */

const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  signup(req, res) {
    if (!req.body.username) {
      return res.status(401)
        .send({ status: false, message: 'Please choose a username' });
    } else if (!req.body.password) {
      return res.status(401)
        .send({ status: false, message: 'Please choose a password' });
    } else if (req.body.password.length < 6) {
      return res.status(400)
        .send({ status: false,
          message: 'Password length must be more than 6 characters' });
    } else if (!req.body.email) {
      return res.status(400)
        .send({ status: false, message: 'Please enter an email address' });
    }
    User.findOne({
      where: {
        email: req.body.email,
      }
    }).then((user) => {
      if (user) {
        return res.status(400)
          .send({ status: false, message: 'Email address already exists' });
      }
    });
    return User
      .create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        email: req.body.email
      })
      .then((user) => {
        const token = jwt
          .sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: 1500 });
        res.status(201).send({ success: true, message: 'Sign up succesful.', token });
      })
      .catch(error => res.status(400).send(error.message));
  },
  login(req, res) {
    if (!req.body.username) {
      return res.status(401)
        .send({ status: false, message: 'Please enter a username' });
    } else if (!req.body.password) {
      return res.status(401)
        .send({ status: false, message: 'Please enter a password' });
    }
    return User
      .findOne({
        where: {
          username: req.body.username,
        }
      }).then((user) => {
        if (!user) {
          return res.status(401)
            .send({ success: false, message: 'User does not exist' });
        }
        if (user) {
          const passwordHash = user.password;
          if (!(bcrypt.compareSync(req.body.password, passwordHash))) {
            return res.status(401)
              .send({ success: false, message: 'Incorrect password!' });
          }
        }
        return res.status(200)
          .send({ success: true, message: "You're signed in" });
      })
      .catch(error => res.status(400).send(error.message));
  },
  allUsers(req, res) {
    return User
      .all()
      .then((user) => {
        if (user.length === 0) {
          return res.status(200)
            .send({ status: true, message: 'No users found' });
        }
        return res.status(200).json(user);
      })
      .catch(error => res.status(400).json(error));
  }
};
