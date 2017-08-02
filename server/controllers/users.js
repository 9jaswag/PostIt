/**
 * User controller
 * handles every user related task
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export default {
  signup(req, res) {
    const errors = { };
    let hasError = false;
    // validation checks
    if (!req.body.username || req.body.username.trim() === '') {
      hasError = true;
      errors.username = 'Username field cannot be empty';
    } if (!req.body.password || req.body.password.trim() === '') {
      hasError = true;
      errors.password = 'Password field cannot be empty';
    } else if (req.body.password.length < 6) {
      hasError = true;
      errors.password = 'Password length must be more than 6 characters';
    } if (!req.body.email || req.body.email.trim() === '') {
      hasError = true;
      errors.email = 'Email address field cannot be empty';
    } if (!req.body.phone || req.body.phone.trim() === '') {
      hasError = true;
      errors.phone = 'Phone field cannot be empty';
    } else if (isNaN(req.body.phone)) {
      hasError = true;
      errors.phone = 'Phone number cannot contain text';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    // check if email already exists
    models.User.findOne({
      where: {
        email: req.body.email,
      }
    }).then((user) => {
      if (user) {
        hasError = true;
        errors.email = 'Email address already exists';
        return res.status(400)
          .send({
            success: false,
            errors
          });
      }
    });
    return models.User
      .create({
        username: req.body.username.trim().toLowerCase(),
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
        if (error.errors[0].message === 'Username already exists') {
          hasError = true;
          errors.username = 'Username already exists';
        }
        if (error.errors[0].message === 'Email can not be empty') {
          hasError = true;
          errors.email = 'Email field can not be empty';
        }
        if (error.errors[0].message === 'Enter a valid email address') {
          hasError = true;
          errors.email = 'Email address is invalid';
        }
        if (error.errors[0].message === 'Validation notEmpty on phone failed') {
          hasError = true;
          errors.phone = 'Phone field can not be empty';
        }
        if (error.errors[0].message === 'Phone number already exists') {
          hasError = true;
          errors.phone = 'Phone number already exists';
        }
        if (error.errors[0].message === 'Phone number must have 11 characters') {
          hasError = true;
          errors.phone = 'Phone number must have 11 characters';
        }
        if (error.errors[0].message === 'Only numeric characters are allowed as phone numbers') {
          hasError = true;
          errors.phone = 'Only numeric characters are allowed as phone numbers';
        }
        res.status(400).send({ success: false, errors });
      }
      );
  },
  login(req, res) {
    const errors = { };
    let hasError = false;
    if (!req.body.username) {
      hasError = true;
      errors.username = 'Username field cannot be empty';
    } else if (!req.body.password) {
      hasError = true;
      errors.password = 'Password field cannot be empty';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    return models.User.findOne({
      where: {
        username: req.body.username.toLowerCase(),
      }
    }).then((user) => {
      if (!user) {
        return res.status(401)
          .send({
            success: false,
            errors: {
              username: 'User does not exist'
            }
          });
      } else if (user) {
        const passwordHash = user.password;
        if (!(bcrypt.compareSync(req.body.password, passwordHash))) {
          return res.status(401)
            .send({
              success: false,
              errors: {
                password: 'Incorrect password!'
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
        success: false,
        errors: { message: error.message }
      }));
  },
  findAll(req, res) {
    return models.User
      .all()
      .then((user) => {
        if (user.length === 0) {
          return res.status(200)
            .send({ success: true, message: 'No users found' });
        }
        return res.status(200).send({ data: { user } });
      })
      .catch(error => res.status(400).send({
        success: false,
        error: { message: error.message }
      }));
  }
};
