/**
 * Group controller
 * handles all group related tasks
 */
import Nexmo from 'nexmo';
import models from '../models';
import sendEmailNotification from '../../helpers/sendEmailNotification';
import getUserEmails from '../../helpers/getUserEmails';
import validator from '../../helpers/validator';
import emailTemplate from '../../helpers/emailTemplate';

export default {
  /**
   * @description Method to create a new group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing details
   * of the newly created group
   */
  createGroup(req, res) {
    if (validator(req, res, 'creategroup') !== 'validated') return;
    models.Group.findOne({
      where: { name: req.body.name }
    }).then((group) => {
      if (group) {
        return res.status(409)
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
          message: 'Your group has been created.',
          data: { group, usergroup }
        })))
      .catch(error => res.status(500).send({
        success: false,
        errors: { message: error.message }
      }));
  },
  /**
   * @description Method to add a user to a group
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
        return res.status(404)
          .send({ success: false,
            error: 'Group does not exist' });
      }
      models.User.findOne({
        where: { id: req.body.userId }
      }).then((user) => {
        if (!user) {
          return res.status(404)
            .send(
              { success: false, error: 'User does not exist'
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
            return res.status(409).send({ success: false,
              error: 'User already belongs to this group' });
          }
          models.UserGroup.create({
            userId: req.body.userId,
            groupId: req.params.group_id
          }).then(usergroup => res.status(201).send({
            success: true,
            message: 'User successfully added to group',
            group: usergroup
          }))
            .catch(error => res.status(400).send({
              success: false,
              error: error.message
            }));
        })
        .catch(error => res.status(500).send({
          success: false,
          error: error.message
        }));
    });
  },
  /**
   * @description Method to post a message to a group
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
        return res.status(404).send({ success: false,
          error: 'That group does not exist' });
      }
      models.UserGroup.findOne({
        where: { userId: req.decoded.id, groupId: req.params.group_id }
      }).then((groupMember) => {
        if (!groupMember) {
          return res.status(401).send({
            success: false,
            error: 'Only group members can post messages to group' });
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
            // message content
            const messageBody = emailTemplate(
              req.body.priority,
              req.headers.host,
              req.body.title,
              new Date().getFullYear()
            );

            // send Email notification
            if (req.body.priority.toLowerCase() === 'urgent') {
            // get users email and send message
              getUserEmails(req.params.group_id).then((users) => {
                users.map((user) => {
                  if (user.email !== req.decoded.email) {
                    const messageOptions = {
                      subject: `${req.body.priority} message on PostIT`,
                      message: messageBody
                    };
                    sendEmailNotification(user.email, messageOptions);
                  }
                  return user;
                });
              });
            }

            const nexmo = new Nexmo({
              apiKey: process.env.API_KEY,
              apiSecret: process.env.API_SECRET,
            });

            // send email and SMS Notification
            if (req.body.priority.toLowerCase() === 'critical') {
            // get user email and phone details
              getUserEmails(req.params.group_id).then((users) => {
                users.map((user) => {
                // send email
                  if (user.email !== req.decoded.email) {
                    const messageOptions = {
                      subject: `${req.body.priority} message on PostIT`,
                      message: messageBody
                    };
                    sendEmailNotification(user.email, messageOptions);
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
            error: error.message
          }));
      });
      // @todo handle these errors "notNull Violation: title cannot be null"
    })
      .catch(error => res.status(500).send({
        success: false,
        error: error.message
      }));
  },
  /**
   * @description Method to get messages belonging to a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of messages
   */
  fetchMessage(req, res) {
    if (validator(req, res, 'fetchmessage') !== 'validated') return;
    // check if group exists
    models.Group.findOne({
      where: { id: req.params.group_id }
    }).then((group) => {
      if (!group) {
        return res.status(404).send({ success: false,
          error: 'Group does not exist' });
      }
      // check if user is group member
      models.UserGroup.findOne({
        where: { userId: req.decoded.id, groupId: req.params.group_id }
      }).then((groupMember) => {
        if (!groupMember) {
          return res.status(401).send({
            success: false,
            error: 'Only group members visit a group' });
        }
        return models.Message
          .findAll({
            order: [['createdAt', 'DESC']],
            where: { groupId: req.params.group_id }
          })
          .then(message => res.status(200).send({
            success: true,
            message }))
          .catch(error => res.status(500).send({
            success: false,
            error: error.message
          }));
      });
    });
  },
  /**
   * @description Method to remove users from a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of messages
   */
  removeUser(req, res) {
    if (!(req.params.group_id) || !(req.body.userId)) {
      return res.status(401).send({ success: false,
        error: 'User and group id must be provided' });
    }
    // cheeck if user and group exists
    models.UserGroup.findOne({
      where: {
        userId: req.body.userId,
        groupId: req.params.group_id
      }
    }).then((userGroup) => {
      if (!userGroup) {
        return res.status(401).send({ success: false,
          error: 'User or group does not exist' });
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
        error: error.message
      }));
  },
  /**
   * @description Method to get the member count for a group
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing an array of messages
   */
  getMemberCount(req, res) {
    if (!(req.params.group_id)) {
      return res.status(401).send({ success: false,
        error: 'Group id must be provided' });
    }
    return models.UserGroup.count({
      where: { groupId: req.params.group_id }
    }).then((group) => {
      if (!group) {
        return res.status(404).send(
          { success: false, error: 'Group does not exist' });
      }
      return res.status(200).send({
        success: true,
        group
      });
    })
      .catch(error => res.status(500).send({
        success: false,
        error: error.message
      }));
  }
};
