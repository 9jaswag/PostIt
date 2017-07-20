/**
 * User controller
 * handles every user related task
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const sequelizeErrors = {};

export default {
  signup(req, res) {
    // validation checks
    if (!req.body.username || req.body.username.trim() === '') {
      return res.status(400)
        .send({
          status: false,
          error: { message: 'Username field cannot be empty' },
          data: req.body
        });
    } else if (!req.body.password || req.body.password.trim() === '') {
      return res.status(400)
        .send({
          status: false,
          error: { message: 'Password field cannot be empty' },
          data: req.body
        });
    } else if (req.body.password.length < 6) {
      return res.status(400)
        .send({
          status: false,
          error: { message: 'Password length must be more than 6 characters' },
          data: req.body
        });
    } else if (!req.body.email || req.body.email.trim() === '') {
      return res.status(400)
        .send({
          status: false,
          error: {
            message: 'Email address field cannot be empty'
          },
          data: req.body
        });
    } else if (!req.body.phone || req.body.phone.trim() === '') {
      return res.status(400)
        .send({
          status: false,
          error: {
            message: 'Phone field cannot be empty'
          },
          data: req.body
        });
    }
    // check if email already exists
    models.User.findOne({
      where: {
        email: req.body.email,
      }
    }).then((user) => {
      if (user) {
        return res.status(400)
          .send({
            status: false,
            error: { message: 'Email address already exists' },
            data: req.body
          });
      }
    });
    return models.User
      .create({
        username: req.body.username.trim(),
        password: bcrypt.hashSync(req.body.password, salt),
        email: req.body.email.trim(),
        phone: req.body.phone.trim()
      })
      .then((user) => {
        const token = jwt
          .sign({
            userId: user.id,
            userEmail: user.email,
            userUsername: user.username,
            userPhone: user.phone
          }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
        res.status(201)
          .send({ success: true,
            message: 'Sign up succesful.',
            data: { token } });
      })
      .catch((error) => {
        if (error.errors[0].message === 'Validation is on username failed') {
          sequelizeErrors.error = 'Username cannot contain numbers';
        }
        if (error.errors[0].message === 'Username already exists') {
          sequelizeErrors.error = 'Username already exists';
        }
        if (error.errors[0].message === 'Email can not be empty') {
          sequelizeErrors.error = 'Email field can not be empty';
        }
        if (error.errors[0].message === 'Enter a valid email address') {
          sequelizeErrors.error = 'Email address is invalid';
        }
        if (error.errors[0].message === 'Validation notEmpty on phone failed') {
          sequelizeErrors.error = 'Phone field can not be empty';
        }
        sequelizeErrors.data = req.body;
        res.status(400).send({ status: false, errors: sequelizeErrors });
      }
      // error => res.status(400).send(error)
      );
  },
  login(req, res) {
    if (!req.body.username) {
      return res.status(401)
        .send({
          status: false,
          error: {
            message: 'Username field cannot be empty'
          },
          data: req.body
        });
    } else if (!req.body.password) {
      return res.status(401)
        .send({
          status: false,
          error: {
            message: 'Password field cannot be empty'
          },
          data: req.body
        });
    }
    return models.User.findOne({
      where: {
        username: req.body.username,
      }
    }).then((user) => {
      if (!user) {
        return res.status(401)
          .send({
            status: false,
            error: {
              message: 'User does not exist'
            }
          });
      } else if (user) {
        const passwordHash = user.password;
        if (!(bcrypt.compareSync(req.body.password, passwordHash))) {
          return res.status(401)
            .send({
              status: false,
              error: {
                message: 'Incorrect password!'
              }
            });
        }
      }
      // generate token
      const token = jwt.sign({
        userId: user.id,
        userEmail: user.email,
        userUsername: user.username,
      }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
      res.status(200)
        .send({ success: true,
          message: 'Sign in successful',
          data: { token } });
    })
      .catch(error => res.status(400).send({
        status: false,
        error: { message: error.message }
      }));
  },
  findAll(req, res) {
    return models.User
      .all()
      .then((user) => {
        if (user.length === 0) {
          return res.status(200)
            .send({ status: true, message: 'No users found' });
        }
        return res.status(200).json({ data: { user } });
      })
      .catch(error => res.status(400).send({
        status: false,
        error: { message: error.message }
      }));
  }
};
