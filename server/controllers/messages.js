/**
 * Message controller
 * handles every message related task
 */
import models from '../models';

export default {
  /**
   * Method to update a message's readby
   * @param {object} req request object
   * @param {object} res response object
   * @return {object} returns an object containing details
   * of the message that was updated
   */
  updateReadBy(req, res) {
    const errors = { };
    let hasError = false;
    // validation
    if (!req.body.id) {
      hasError = true;
      errors.id = 'Message ID not supplied';
    }
    if (!req.body.readby) {
      hasError = true;
      errors.readby = 'Read By not supplied';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    models.Message.findOne({
      where: {
        id: req.body.id
      },
      attributes: ['id', 'readby'],
    })
      .then((message) => {
        if (!message) {
          hasError = true;
          errors.message = 'Message does not exist';
        }
        if (hasError) {
          return res.status(400).send({ success: false, errors });
        }
        if (message.readby.includes(req.body.readby)) {
          return res.status(400).send({ success: false, errors: 'User has read this message' });
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
        res.status(400).send({ success: false, errors: error.message });
      });
  }
};
