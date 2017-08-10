/**
 * Group controller
 * handles all group related tasks
 */
import nodemailer from 'nodemailer';
import models from '../models';

/**
 * @return {promise} an array of users and their email addresses.
 * @param {*} groupId 
 */
function getUserEmails(groupId) {
  return new Promise((resolve) => {
    models.Group.findOne({
      where: {
        id: groupId
      },
      attributes: ['id']
    })
      .then((group) => {
        group.getUsers({ attributes: ['id', 'username', 'email'] })
          .then((users) => {
            resolve(users);
          });
      });
  });
}

/**
 * @return void
 * @param {*} email 
 * @param {*} message 
 * @param {*} priority 
 */
function sendEmailNotification(email, message, priority) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail', // secure:true for port 465, secure:false for port 587
    port: 465,
    auth: {
      user: 'chuks24ng@gmail.com',
      pass: 'fgsltw@gmail.com'
    }
  });

  // setup email data 
  const mailOptions = {
    from: 'chuks2ng@gmail.com',
    to: email,
    subject: `${priority} message on PostIT`,
    text: message
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export default {
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
      .then((group) => {
        return models.UserGroup
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
          }));
      })
      .catch(error => res.status(400).send({
        success: false,
        errors: { message: error.message }
      }));
  },
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
            .send({ success: false, error: { message: 'User does not exist' } });
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
  postMessage(req, res) {
    if (!req.body.title || req.body.title.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Message title can not be empty' } });
    } else if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Message can not be empty' } });
    } else if (!req.body.priority || req.body.priority.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Choose a message priority' } });
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
      } else {
        return models.Message
          .create({
            title: req.body.title,
            message: req.body.message,
            priority: req.body.priority,
            author: req.decoded.userUsername,
            readby: req.decoded.userUsername,
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
              // console.log('send email');
              getUserEmails(req.params.group_id).then((users) => {
                users.map((user) => {
                  sendEmailNotification(user.email, req.body.message, req.body.priority);
                  return user;
                });
              });
            }
            // send sms Notification
            if (req.body.priority.toLowerCase() === 'critical') {
              // console.log('send sms');
              getUserEmails(req.params.group_id).then((user) => {
                console.log(user);
              });
            }
          })
          .catch(error => res.status(400).send({
            success: false,
            error: { message: error.message }
          }));
        // @todo handle these errors "notNull Violation: title cannot be null"
      }
    })
      .catch(error => res.status(400).send({
        success: false,
        message: error.message
      }));
  },
  fetchMessage(req, res) {
    models.Group.findOne({
      where: {
        id: req.params.group_id
      }
    }).then((group) => {
      if (!group) {
        return res.status(404).send({ success: false,
          error: { message: 'Group does not exist' } });
      } else {
        return models.Message
          .findAll({
            where: {
              groupId: req.params.group_id
            }
          })
          .then(message => res.status(200).send({ data: message }))
          .catch(error => res.status(400).send({
            success: false,
            error: { message: error.message }
          }));
      }
    });
  }
};
