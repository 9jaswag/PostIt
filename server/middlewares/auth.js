/**
 * Authentication Middleware
 */

import jwt from 'jsonwebtoken';
import controllers from '../controllers';

// Middleware
let token;
export default (req, res, next) => {
  token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'User not authenticated. Failed to authenticate token.'
      });
    }
    // if everything is good, save to request for use in other routes
    req.decoded = decoded;
    next();
  });
};
