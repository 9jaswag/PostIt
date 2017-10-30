/**
 * Message controller
 * handles every message related task
 */
import models from '../models';
import validator from '../../helpers/validator';

export default {
  /**
   * Method to update a message's readby
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing details
   * of the message that was updated
   */
  updateReadBy(req, res) {
    const errors = {};
    // validation
    if (validator(req, res, 'updatereadby') !== 'validated') return;
    models.Message.findOne({
      where: { id: req.body.id },
      attributes: ['id', 'readby'],
    })
      .then((message) => {
        if (!message) {
          errors.message = 'Message does not exist';
          return res.status(400).send({ success: false, errors });
        }
        if (message.readby.includes(req.body.readby)) {
          return res.status(400).send(
            { success: false, errors: 'User has read this message' });
        }
        message.readby.push(req.body.readby);
        return models.Message.update({
          readby: message.readby
        }, {
          where: { id: req.body.id }
        })
          .then(() => {
            res.status(200).send({ success: true, message });
          })
          .catch((error) => {
            res.status(400).send({ success: false, errors: error.message });
          });
      })
      .catch((error) => {
        res.status(500).send({ success: false, errors: error.message });
      });
  }
};
