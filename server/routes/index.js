import jwt from 'jsonwebtoken';
import controllers from '../controllers';

module.exports = (app) => {
  // base API
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Post IT API!',
  }));

  // API route to handle user sign up
  app.post('/api/user/signup', controllers.users.signup);
  // API route to handle user sign in
  app.post('/api/user/login', controllers.users.login);
  // API to get all users
  app.get('/api/users', controllers.users.allUsers);

  // Middleware
  let token;
  app.use((req, res, next) => {
    token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res
          .json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  });

  // API to create new group
  app.post('/api/group', controllers.groups.create);
  // API route for users to add other users to groups:
  app.post('/api/group/:group_id/user', controllers.groups.addUser);

  // API for logged in users to post messages to a group
  app.post('/api/group/:group_id/message', controllers.groups.postMessage);
  // API for logged in users to retrieve messages in their group
  app.get('/api/group/:group_id/messages', controllers.groups.fetchMessage);
};
