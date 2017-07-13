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
  },
};
