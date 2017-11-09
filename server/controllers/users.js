import bcrypt from 'bcrypt';
import models from '../models';
import sendEmailNotification from '../../helpers/sendEmailNotification';
import customSort from '../../helpers/customSort';
import validator from '../../helpers/validator';
import sequelizeError from '../../helpers/sequelizeError';
import generateToken from '../../helpers/generateToken';
import paginate from '../../helpers/paginate';
import { resetPasswordEmailTemplate } from '../../helpers/emailTemplate';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export default {
  /**
   * @description Method to sign up users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing user token
   */
  signup(req, res) {
    const errors = {};
    if (validator(req, res, 'signup') !== 'validated') return;
    models.User.findOne({ where: { username: req.body.username } })
      .then((foundUser) => {
        if (foundUser) {
          errors.username = 'Username already exists';
          return res.status(409).send({
            success: false, errors });
        }
        models.User.findOne({ where: { email: req.body.email } })
          .then((foundEmail) => {
            if (foundEmail) {
              errors.email = 'Email address already exists';
              return res.status(409).send({
                success: false, errors });
            }
          });
        return models.User.create({
          username: req.body.username.trim().toLowerCase(),
          password: req.body.password,
          email: req.body.email.trim(),
          phone: req.body.phone.trim()
        })
          .then((user) => {
            const token = generateToken(user);
            return res.status(201).send({
              success: true,
              message: 'Sign up succesful.',
              token
            });
          })
          .catch(error => res.status(500).send({
            success: false,
            errors: sequelizeError(error)
          }));
      });
  },
  /**
   * @description Method to sign in users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing user token
   */
  login(req, res) {
    if (validator(req, res, 'signin') !== 'validated') return;
    return models.User.findOne({
      where: {
        username: req.body.username.toLowerCase(),
      }
    }).then((user) => {
      if (!user) {
        return res.status(404)
          .send({
            success: false,
            errors: { username: 'User does not exist' }
          });
      }
      if (user && user.verifyPassword(req.body.password)) {
        const token = generateToken(user);
        return res.status(200).send({ success: true,
          message: 'Sign in successful',
          token });
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
   * @description Method to get a single users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing a user's detail
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
          return res.status(422)
            .send({ success: true, message: 'user not found' });
        }
        return res.status(200).send({ success: true, user });
      })
      .catch(error => res.status(500).send({
        success: false,
        errors: { message: error.message }
      }));
  },
  /**
   * @description Method to get the details of current logged in user
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of user objects
   */
  findCurrentUser(req, res) {
    const username = req.decoded.username;
    models.User
      .findOne({
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
        let mapCounter = 0;
        const groupsWithCount = [];
        user.Groups.map(group =>
          group.getMessages({ attributes: ['readby'] })
            .then((messages) => {
              let unreadCount = 0;
              messages.forEach((message) => {
                if (!message.readby.includes(username)) unreadCount += 1;
              });
              groupsWithCount.push({ group, unreadCount });
              mapCounter += 1;
              if (mapCounter === user.Groups.length) {
                res.status(200).send({
                  success: true,
                  groups: groupsWithCount.sort(customSort)
                });
              }
            })
        );
      })
      .catch(error => res.status(500).send({ success: false,
        error: error.message }));
  },
  /**
   * @description Method to search for users
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
      .then((users) => {
        if (users.count > 0) {
          return res.status(200).send({ success: true,
            users: users.rows,
            pagination: paginate(users.count, limit, offset) });
        }
        res.status(422).send({ success: false, error: 'User was not found' });
      })
      .catch((error) => {
        res.status(500).send({ success: false, error: error.message });
      });
  },
  /**
   * @description Method to reset users password
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns a user object
   */
  resetUserPassword(req, res) {
    if (validator(req, res, 'requestreset') !== 'validated') return;
    const email = req.body.email;
    models.User.findOne({
      where: { email },
      attributes: ['id', 'email', 'resetToken', 'resetTime']
    })
      .then((user) => {
        if (!user) {
          return res.status(400).send(
            { success: false,
              errors: { username: 'No user with this email address' } }
          );
        }
        if (req.body.type === 'request') {
          const stringToHash = `${Math.random().toString()}`;
          const resetToken = bcrypt.hashSync(stringToHash, salt);
          const resetTime = Date.now();
          models.User.update({
            resetToken,
            resetTime
          }, {
            where: { email }
          })
            .then(() => {
              const messageBody = resetPasswordEmailTemplate(
                req.headers.host,
                resetToken,
                email,
                new Date().getFullYear()
              );
              const messageOptions = {
                subject: 'Password Request on PostIT',
                message: messageBody
              };
              sendEmailNotification(email, messageOptions);
              if (process.env.NODE_ENV === 'test') {
                res.status(200).send({
                  success: true, message: 'Email sent', resetToken });
              }
              res.status(200).send({
                success: true, message: 'Email sent. Check your inbox' });
            })
            .catch(error => res.status(400).send(
              { success: false, error: error.message }));
        }
        if (req.body.type === 'reset') {
          if (!req.body.password) {
            return res.status(400).send(
              { success: false, error: 'Provide a new password' });
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
          models.User.update({
            password: bcrypt.hashSync(password, salt),
            resetToken: null,
            resetTime: null
          }, {
            where: { email }
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
