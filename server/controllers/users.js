/**
 * User controller
 * handles every user related task
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import sendEmailNotification from '../../helpers/sendEmailNotification';
import customSort from '../../helpers/customSort';

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
        password: req.body.password,
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
          }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        return res.status(201)
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
        if (error.errors[0].message
          === 'Formatted phone number must have 13 characters') {
          hasError = true;
          errors.phone = 'Formatted phone number must have 13 characters';
        }
        if (error.errors[0].message ===
          'Only numeric characters are allowed as phone numbers') {
          hasError = true;
          errors.phone = 'Only numeric characters are allowed as phone numbers';
        }
        return res.status(400).send({ success: false, errors });
      }
      );
  },
  /**
   * Method to sign in users
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing user token
   */
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
      }
      if (user && user.verifyPassword(req.body.password)) {
        // generate token
        const token = jwt.sign({
          userId: user.id,
          userEmail: user.email,
          userUsername: user.username,
        }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
        return res.status(200).send({ success: true,
          message: 'Sign in successful',
          data: { token } });
      }
      return res.status(401).send({
        success: false,
        errors: {
          password: 'Incorrect password!'
        }
      });
    })
      .catch(error => res.status(400).send({
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
  findAll(req, res) {
    return models.User
      .findAll({
        include: [{
          model: models.Group,
          order: [['createdAt', 'DESC']],
          required: false,
          attributes: ['id'],
          through: { attributes: [] }
        }],
        attributes: ['id', 'username', 'email', 'phone']
      })
      .then((user) => {
        if (user.length === 0) {
          return res.status(200)
            .send({ success: true, message: 'No users found' });
        }
        return res.status(200)
          .send({ details: req.userGroupInfo, data: { user } });
      })
      .catch(error => res.send({
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
    const username = req.decoded.userUsername;
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
          return res.status(404).send({
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
      .catch(error => res.status(400).send({ errors: error.message }));
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
        res.status(400).send({ success: false, errors: error.message });
      });
  },
  /**
   * Method to reset users password
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns a user object
   */
  resetUserPassword(req, res) {
    if (!(req.body.email)) {
      return res.status(400).send(
        { status: false, error: 'No email address provided' });
    }
    if (!(req.body.type)) {
      return res.status(400).send(
        { status: false, error: 'Request type must be specified' }
      );
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
              // setup email data 
              const mailOptions = {
                from: 'PostIT',
                to: email,
                subject: 'Password Request on PostIT',
                text: `You have requested a password reset on your PostIT
                account.\n Please click on the following link, or
                paste this intoyour browser to complete the process:\n
                ${`http://${req.headers.host}/resetpassword/?token=${resetToken}&email=${email}`}\n
                If you did not request this, please ignore this email.\n`
              };
              // send email
              sendEmailNotification(mailOptions);
              res.status(200).send({ status: true, message: 'Email sent' });
            })
            .catch(error => res.status(400).send(
              { status: false, error: error.message }));
        }
        if (req.body.type === 'reset') {
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
                error: 'Token has expired. Please request for anotherpassword reset.'
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
      .catch(error => res.status(400).send(
        { status: false, error: error.message }
      ));
  }
};
