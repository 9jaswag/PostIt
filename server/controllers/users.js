/**
 * User controller
 * handles every user related task
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';

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
    models.User.findOne({
      where: {
        email: req.body.email,
      }
    }).then((user) => {
      if (user) {
        return res.status(400)
          .send({ status: false, message: 'Email address already exists' });
      }
    });
    return models.User
      .create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        email: req.body.email
      })
      .then((user) => {
        const token = jwt
          .sign({
            userId: user.id,
            userEmail: user.email,
            userUsername: user.username,
          }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(201)
          .send({ success: true, message: 'Sign up succesful.', token });
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
    return models.User
      .findOne({
        where: {
          username: req.body.username,
        }
      }).then((user) => {
        if (!user) {
          return res.status(401)
            .send({ success: false, message: 'User does not exist' });
        } else if (user) {
          const passwordHash = user.password;
          if (!(bcrypt.compareSync(req.body.password, passwordHash))) {
            return res.status(401)
              .send({ success: false, message: 'Incorrect password!' });
          }
        }
        // generate token
        const token = jwt.sign({ data: user }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.status(200)
          .send({ success: true, message: "You've been signed in", token });
      })
      .catch(error => res.status(400).send(error.message));
  },
  allUsers(req, res) {
    return models.User
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
