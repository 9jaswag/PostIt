/**
 * User controller
 * handles every user related task
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import sendEmailNotification from '../../helpers/sendEmailNotification';
import customSort from '../../helpers/customSort';
import validator from '../../helpers/validator';
import sequelizeError from '../../helpers/sequelizeError';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export default {
  /**
   * Method to sign up users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing user token
   */
  signup(req, res) {
    const errors = { };
    // validation checks
    if (validator(req, res, 'signup') !== 'validated') {
      return;
    }
    // check if username exists
    models.User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (user) {
          errors.username = 'Username already exists';
          return res.status(409).send({ success: false, errors });
        }
      });
    // check if email already exists
    models.User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          errors.email = 'Email address already exists';
          return res.status(409)
            .send({ success: false, errors });
        }
      });
    return models.User
      .create({
        username: req.body.username.trim().toLowerCase(),
        password: req.body.password,
        email: req.body.email.trim(),
        phone: req.body.phone.trim()
      })
      .then((user) => {
        const token = jwt
          .sign({
            id: user.id,
            email: user.email,
            username: user.username,
            phone: user.phone
          }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        return res.status(201)
          .send({ success: true,
            message: 'Sign up succesful.',
            data: { token } });
      })
      .catch(error => res.status(500).send({
        success: false,
        errors: sequelizeError(error)
      })
      );
  },
  /**
   * Method to sign in users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing user token
   */
  login(req, res) {
    if (validator(req, res, 'signin') !== 'validated') {
      return;
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
            errors: { username: 'User does not exist' }
          });
      }
      if (user && user.verifyPassword(req.body.password)) {
        // generate token
        const token = jwt.sign({
          id: user.id,
          email: user.email,
          username: user.username,
          phone: user.phone
        }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        return res.status(200).send({ success: true,
          message: 'Sign in successful',
          data: { token } });
      }
      return res.status(401).send({
        success: false,
        errors: { password: 'Incorrect password!' }
      });
    })
      .catch(error => res.status(500).send({
        success: false,
        errors: { message: error.message }
      }));
  },
  /**
   * Method to get a list all users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of users
   */
  findUser(req, res) {
    if (!req.body.username) {
      return res.status(400).send({
        success: false,
        message: 'Username is required'
      });
    }
    return models.User
      .findOne({
        include: [{
          model: models.Group,
          required: false,
          attributes: ['id'],
          through: { attributes: [] }
        }],
        where: { username: req.body.username },
        attributes: ['id', 'username']
      })
      .then((user) => {
        if (!user) {
          return res.status(200)
            .send({ success: true, message: 'user not found' });
        }
        return res.status(200).send({ user });
      })
      .catch(error => res.status(500).send({
        success: false,
        error: { message: error.message }
      }));
  },
  /** Method to get the details of current logged in user
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of user objects
   */
  findCurrentUser(req, res) {
    const username = req.decoded.username;
    models.User
      .find({
        include: [{
          model: models.Group,
          order: [['createdAt', 'DESC']],
          required: false,
          attributes: ['id', 'name', 'description', 'owner'],
          through: { attributes: [] }
        }],
        where: { username },
        attributes: ['id', 'username', 'email', 'phone']
      })
      .then((user) => {
        if (!user) {
          return res.status(403).send({
            success: false,
            errors: 'User does not exist'
          });
        }
        let mapCounter = 0;
        const groupsWithCount = [];
        user.Groups.map(group =>
          // get messages that belong to each group
          models.Message.findAll({
            where: { groupId: group.id },
            attributes: ['readby']
          }).then((messages) => {
            let unreadCount = 0;
            messages.forEach((message) => {
              // if message has not been read by user, increment counter
              if (!message.readby.includes(username)) {
                unreadCount += 1;
              }
            });
            groupsWithCount.push({ group, unreadCount });
            mapCounter += 1;
            if (mapCounter === user.Groups.length) {
              // send response
              // sort array to return by id
              return res.status(200).send(
                { data: groupsWithCount.sort(customSort) });
            }
          })
        );
      })
      .catch(error => res.status(500).send({ errors: error.message }));
  },
  /**
   * Method to search for users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of user objects
   */
  searchUsers(req, res) {
    const username = req.query.username;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 2;
    return models.User.findAndCountAll({
      include: [{
        model: models.Group,
        required: false,
        attributes: ['id'],
        through: { attributes: [] }
      }],
      distinct: true,
      offset,
      limit,
      where: { username: { $like: `%${username}%` } },
      attributes: ['id', 'username', 'email', 'phone'],
    })
      .then((user) => {
        res.status(200).send({ success: true, data: user });
      })
      .catch((error) => {
        res.status(500).send({ success: false, errors: error.message });
      });
  },
  /**
   * Method to reset users password
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns a user object
   */
  resetUserPassword(req, res) {
    if (validator(req, res, 'requestreset') !== 'validated') {
      return;
    }
    const email = req.body.email;
    models.User.findOne({
      where: {
        email
      },
      attributes: ['id', 'email', 'resetToken', 'resetTime']
    })
      .then((user) => {
        if (!user) {
          return res.status(400).send(
            { status: false, error: 'No user with this email address' }
          );
        }
        if (req.body.type === 'request') {
          const stringToHash = `${Math.random().toString()}`;
          const resetToken = bcrypt.hashSync(stringToHash, salt);
          const resetTime = Date.now();
          // update table
          models.User.update({
            resetToken,
            resetTime
          }, {
            where: {
              email
            }
          })
            .then(() => {
              const messageOptions = {
                subject: 'Password Request on PostIT',
                message: `<div><p>Hello there!,</p>
                <p>You have requested a password reset on your PostIT
                account. If you requested it, click the button below or
                copy the link into your browser.</p>
                <p>If this is not you, please disregard this email</p>
                <p style="padding: 1rem;"></p>
                <a style="padding: 0.7rem 2rem; background: #00a98f; color: white; text-decoration: none; border-radius: 2px;" href="http://${req.headers.host}/resetpassword/?token=${resetToken}&email=${email}">Login</a>\n\n
                <p style="padding: 1rem 0rem;">Link: http://${req.headers.host}/resetpassword/?token=${resetToken}&email=${email}</p>
                <p>PostIT</p>
                </div>`
              };
              // send email
              sendEmailNotification(email, messageOptions);
              if (process.env.NODE_ENV === 'test') {
                res.status(200).send({
                  status: true, message: 'Email sent', resetToken });
              }
              res.status(200).send({ status: true, message: 'Email sent' });
            })
            .catch(error => res.status(400).send(
              { status: false, error: error.message }));
        }
        if (req.body.type === 'reset') {
          if (!req.body.password) {
            return res.status(400).send(
              { status: false, error: 'Provide a new password' });
          }
          if (!req.body.token) {
            return res.status(400).send(
              { status: false, error: 'No token is provided' });
          }
          const receivedToken = req.body.token;
          const currentTime = Date.now();
          const password = req.body.password;
          if (user.resetToken !== receivedToken) {
            return res.status(400).send(
              { status: false, error: 'Invalid token' });
          }
          if (currentTime - user.resetTime > 3600000) {
            return res.status(400).send(
              { status: false,
                error: 'Link has expired. Request for another reset link.'
              });
          }
          // reset user password and delete token and resetTime
          models.User.update({
            password: bcrypt.hashSync(password, salt),
            resetToken: null,
            resetTime: null
          }, {
            where: {
              email
            }
          })
            .then(() => {
              res.status(200).send(
                { success: true, message: 'Password reset successful' });
            })
            .catch(error => res.status(400).send(
              { success: false, error: error.message }));
        }
      })
      .catch(error => res.status(500).send(
        { status: false, error: error.message }
      ));
  }
};
