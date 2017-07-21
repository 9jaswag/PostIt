import jwt from 'jsonwebtoken';
import controllers from '../controllers';
import path from 'path';
import auth from '../middlewares/auth';


module.exports = (app) => {
  // base API
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Post IT API!',
  }));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  // API route to handle user sign up
  app.post('/api/user/signup', controllers.users.signup);
  // API route to handle user sign in
  app.post('/api/user/signin', controllers.users.login);
  // // API to get all users
  app.get('/api/users', auth, controllers.users.findAll);
  // API for logged in users to retrieve messages in their group
  app.get('/api/group/:group_id/messages', auth, controllers.groups.fetchMessage);

  // API to create new group
  app.post('/api/group', auth, controllers.groups.create);
  // API route for users to add other users to groups:
  app.post('/api/group/:group_id/user', auth, controllers.groups.addUser);

  // API for logged in users to post messages to a group
  app.post('/api/group/:group_id/message', auth, controllers.groups.postMessage);
};
