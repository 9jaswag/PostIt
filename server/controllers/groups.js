/**
 * Group controller
 * handles all group related tasks
 */
import models from '../models';

export default {
  create(req, res) {
    if (!req.body.name) {
      return res.status(401)
        .send({ status: false, message: 'Please choose a group name' });
    } else if (!req.body.owner) {
      return res.status(401)
        .send({ status: false, message: 'Please enter a group owner' });
    } else if (!req.body.description) {
      return res.status(401)
        .send({ status: false, message: 'Please enter a description of the group' });
    }
    models.Group.findOne({
      where: {
        name: req.body.name
      }
    }).then((group) => {
      if (group) {
        return res.status(400)
          .send({ status: false, message: 'Group name already exists' });
      }
    });
    return models.Group
      .create({
        name: req.body.name,
        owner: req.body.owner,
        description: req.body.description
      })
      .then((group) => {
        res.status(201).send(group);
        return models.UserGroup
          .create({
            userId: req.decoded.userId,
            groupId: group.id
          })
          .then(usergroup => res.status(201).send({
            success: true,
            message: 'Your group has been created and you have been added to the group',
            usergroup
          }))
          .catch(error => res.status(400).send({
            status: false,
            message: error.message
          }));
      })
      .catch(error => res.status(400).send({
        status: false,
        message: error.message
      }));
  },
}

