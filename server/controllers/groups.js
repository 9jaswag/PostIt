/**
 * Group controller
 * handles all group related tasks
 */
import Nexmo from 'nexmo';
import models from '../models';
import sendEmailNotification from '../../helpers/sendEmailNotification';
import getUserEmails from '../../helpers/getUserEmails';
import validator from '../../helpers/validator';

/**
 * Function for sending email notification to users
 * @param {string} email user's email
 * @param {string} message message to be sent
 * @param {string} priority message's priority
 * @return {void}
 */

export default {
  /**
   * Method to create a new group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing details
   * of the newly created group
   */
  create(req, res) {
    if (validator(req, res, 'creategroup') !== 'validated') return;
    models.Group.findOne({
      where: { name: req.body.name }
    }).then((group) => {
      if (group) {
        return res.status(400)
          .send({ success: false,
            errors: { group: 'Group already exists' } });
      }
    });
    return models.Group
      .create({
        name: req.body.name,
        owner: req.decoded.username,
        description: req.body.description
      })
      .then(group => models.UserGroup
        .create({
          userId: req.decoded.id,
          groupId: group.id
        })
        .then(usergroup => res.status(201).send({
          success: true,
          message: 'Your group has been created and you have been added to the group',
          data: { group, usergroup }
        })))
      .catch(error => res.status(500).send({
        success: false,
        errors: { message: error.message }
      }));
  },
  /**
   * Method to add a user to a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object confirming user has been added to group
   */
  addUser(req, res) {
    if (validator(req, res, 'adduser') !== 'validated') return;
    models.Group.findOne({
      where: { id: req.params.group_id }
    }).then((group) => {
      if (!group) {
        return res.status(401)
          .send({ success: false, error: { message: 'Group does not exist' } });
      }
      models.User.findOne({
        where: { id: req.body.userId }
      }).then((user) => {
        if (!user) {
          return res.status(401)
            .send(
              { success: false, error: { message: 'User does not exist' }
              });
        }
      });
      return models.UserGroup
        .findOne({
          where: {
            userId: req.body.userId,
            groupId: req.params.group_id
          }
        })
        .then((user) => {
          if (user) {
            return res.status(400).send({ success: false,
              error: { message: 'User already belongs to this group' } });
          }
          models.UserGroup.create({
            userId: req.body.userId,
            groupId: req.params.group_id
          }).then(usergroup => res.status(201).send({
            success: true,
            message: 'User successfully added to group',
            data: { usergroup }
          }))
            .catch(error => res.status(400).send({
              success: false,
              error: { message: error.message }
            }));
        })
        .catch(error => res.status(500).send({
          success: false,
          error: { message: error.message }
        }));
    });
  },
  /**
   * Method to post a message to a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing details of the posted message
   */
  postMessage(req, res) {
    if (validator(req, res, 'postmessage') !== 'validated') return;
    models.Group.findOne({
      where: { id: req.params.group_id }
    }).then((group) => {
      if (!group) {
        return res.status(401).send({ success: false,
          error: { message: 'That group does not exist' } });
      }
      return models.Message
        .create({
          title: req.body.title,
          message: req.body.message,
          priority: req.body.priority || 'normal',
          author: req.decoded.username,
          readby: [req.decoded.username],
          groupId: req.params.group_id,
          userId: req.decoded.id
        })
        .then((message) => {
          // send response to client before attempting to send notification
          res.status(201).send({
            success: true,
            message: 'Message sent',
            data: { message }
          });

          // send Email notification
          if (req.body.priority.toLowerCase() === 'urgent') {
            // get users email and send message
            getUserEmails(req.params.group_id).then((users) => {
              users.map((user) => {
                if (user.email !== req.decoded.email) {
                  // setup email data
                  const mailOptions = {
                    from: 'PostIT',
                    to: user.email,
                    subject: `${req.body.priority} message on PostIT`,
                    text: `You have a new ${req.body.priority}
                    message on PostIT.Login to check it now.\n
                    Message: ${req.body.message}`
                  };
                  sendEmailNotification(mailOptions);
                }
                return user;
              });
            });
          }

          const nexmo = new Nexmo({
            apiKey: process.env.API_KEY,
            apiSecret: process.env.API_SECRET,
          });

            // send sms Notification
          if (req.body.priority.toLowerCase() === 'critical') {
            // get user email and phone details
            getUserEmails(req.params.group_id).then((users) => {
              users.map((user) => {
                // send email
                if (user.email !== req.decoded.email) {
                  const mailOptions = {
                    from: 'PostIT',
                    to: user.email,
                    subject: `${req.body.priority} message on PostIT`,
                    text: `You have a new ${req.body.priority}
                    message on PostIT. Login to check it now.\n
                    Message: ${req.body.message}`
                  };
                  sendEmailNotification(mailOptions);
                }
                // send sms
                if (user.phone !== req.decoded.phone) {
                  nexmo.message.sendSms(
                    '2347033130448',
                    user.phone, req.body.message, (err, res) => {
                      if (err) {
                        return err;
                      }
                      return res;
                    });
                }
                return user;
              });
            });
          }
        })
        .catch(error => res.status(400).send({
          success: false,
          error: { message: error.message }
        }));
      // @todo handle these errors "notNull Violation: title cannot be null"
    })
      .catch(error => res.status(500).send({
        success: false,
        message: error.message
      }));
  },
  /**
   * Method to get messages belonging to a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of messages
   */
  fetchMessage(req, res) {
    models.Group.findOne({
      where: {
        id: req.params.group_id
      }
    }).then((group) => {
      if (!group) {
        return res.status(401).send({ success: false,
          error: { message: 'Group does not exist' } });
      }
      return models.Message
        .findAll({
          order: [['createdAt', 'DESC']],
          where: {
            groupId: req.params.group_id
          }
        })
        .then(message => res.status(200).send({ success: true, data: message }))
        .catch(error => res.status(500).send({
          success: false,
          error: { message: error.message }
        }));
    });
  },
  /**
   * Method to remove users from a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of messages
   */
  removeUser(req, res) {
    if (!(req.params.group_id) || !(req.body.userId)) {
      return res.status(401).send({ success: false,
        error: { message: 'User and group id must be provided' } });
    }
    models.UserGroup.findOne({
      where: {
        userId: req.body.userId,
        groupId: req.params.group_id
      }
    }).then((user) => {
      if (!user) {
        return res.status(401).send({ success: false,
          error: { message: 'User or group does not exist' } });
      }
      models.UserGroup.destroy({
        where: {
          userId: req.body.userId,
          groupId: req.params.group_id
        }
      }).then(removedUser => res.status(200).send({
        success: true,
        removedUser
      }));
    })
      .catch(error => res.status(500).send({
        success: false,
        error: { message: error.message }
      }));
  },
  /**
   * Method to get the member count for a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of messages
   */
  getMemberCount(req, res) {
    if (!(req.params.group_id)) {
      return res.status(401).send({ success: false,
        error: { message: 'Group id must be provided' } });
    }
    return models.UserGroup.count({
      where: {
        groupId: req.params.group_id
      }
    }).then((data) => {
      if (!data) {
        return res.status(404).send(
          { success: false, message: 'Group does not exist' });
      }
      return res.status(200).send({
        success: true,
        data
      });
    })
      .catch(error => res.status(500).send({
        success: false,
        error: { message: error.message }
      }));
  }
};
