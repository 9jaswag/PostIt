/**
 * Message controller
 * handles every message related task
 */
import models from '../models';

export default {
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
      }
    })
      .then((message) => {
        if (!message) {
          hasError = true;
          errors.message = 'Message does not exist';
        }
        if (hasError) {
          return res.status(400).send({ success: false, errors });
        }
        return models.Message.update({
          readby: req.body.readby
        }, {
          where: { id: req.body.id }
        })
          .then(() => {
            res.status(201).send({ success: true, message });
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
