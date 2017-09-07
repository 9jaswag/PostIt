/**
 * Group controller
 * handles all group related tasks
 */
import Nexmo from 'nexmo';
import models from '../models';
import sendEmailNotification from '../../helpers/sendEmailNotification';
import getUserEmails from '../../helpers/getUserEmails';

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
    const errors = { };
    let hasError = false;
    if (!req.body.name || req.body.name.trim() === '') {
      hasError = true;
      errors.name = 'Please choose a group name';
    } if (!req.decoded.userUsername) {
      hasError = true;
      errors.userUsername = 'Please enter a group owner';
    } if (!req.body.description || req.body.description.trim() === '') {
      hasError = true;
      errors.description = 'Please enter a description of the group';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    models.Group.findOne({
      where: {
        name: req.body.name
      }
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
        owner: req.decoded.userUsername,
        description: req.body.description
      })
      .then(group => models.UserGroup
        .create({
          userId: req.decoded.userId,
          groupId: group.id
        })
        .then(usergroup => res.status(201).send({
          success: true,
          message: 'Your group has been created and you have been added to the group',
          data: { group, usergroup }
        }))
        .catch(error => res.status(400).send({
          success: false,
          errors: { message: error.message }
        })))
      .catch(error => res.status(400).send({
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
    if (!req.body.userId) {
      return res.status(400)
        .send({ success: false, error: { message: 'a User ID is required' } });
    } else if (!req.params.group_id || req.params.group_id.trim() === '') {
      return res.status(400)
        .send({ success: false, message: 'a Group ID is required' });
    }
    models.Group.findOne({
      where: {
        id: req.params.group_id
      }
    }).then((group) => {
      if (!group) {
        return res.status(401)
          .send({ success: false, error: { message: 'Group does not exist' } });
      }
      models.User.findOne({
        where: {
          id: req.body.userId
        }
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
        .catch(error => res.status(400).send({
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
    if (!req.body.title || req.body.title.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Message title can not be empty' } });
    } else if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Message can not be empty' } });
    } else if (!req.decoded.userUsername || req.decoded.userUsername.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Readby cannot be empty' } });
    } else if (!req.decoded.userUsername) {
      return res.status(400).send({ success: false,
        error: { message: 'Message must have an author' } });
    } else if (!req.decoded.userId) {
      return res.status(400).send({ success: false,
        error: { message: 'Message must have a User ID' } });
    }
    models.Group.findOne({
      where: {
        id: req.params.group_id
      }
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
          author: req.decoded.userUsername,
          readby: [req.decoded.userUsername],
          groupId: req.params.group_id,
          userId: req.decoded.userId
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
                if (user.email !== req.decoded.userEmail) {
                  // setup email data
                  const mailOptions = {
                    from: 'PostIT',
                    to: user.email,
                    subject: `${req.body.priority} message on PostIT`,
                    text: `You have a new ${req.body.priority} message on PostIT. Login to check it now.\n
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
                if (user.email !== req.decoded.userEmail) {
                  const mailOptions = {
                    from: 'PostIT',
                    to: user.email,
                    subject: `${req.body.priority} message on PostIT`,
                    text: `You have a new ${req.body.priority} message on PostIT. Login to check it now.\n
                      Message: ${req.body.message}`
                  };
                  sendEmailNotification(mailOptions);
                }
                // send sms
                if (user.phone !== req.decoded.userPhone) {
                  nexmo.message.sendSms('2347033130448', user.phone, req.body.message, (err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(res);
                    }
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
      .catch(error => res.status(400).send({
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
        .catch(error => res.status(400).send({
          success: false,
          error: { message: error.message }
        }));
    });
  },
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
      .catch(error => res.status(400).send({
        success: false,
        error: { message: error.message }
      }));
  }
};
