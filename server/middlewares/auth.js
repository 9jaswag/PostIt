/**
 * Authentication Middleware
 */

import jwt from 'jsonwebtoken';
import models from '../models';

// Middleware
let token;

/**
 * @description authentication middleware
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next next middleware function
 * @return {void}
 */
export default (req, res, next) => {
  token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: 'Invalid access token.' });
    } else {
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      const username = req.decoded.username;
      models.User.findOne({
        where: { username },
        attributes: ['id', 'username', 'email']
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              sucess: false, error: 'User does not exist' });
          }
          next();
        });
    }
  });
};
