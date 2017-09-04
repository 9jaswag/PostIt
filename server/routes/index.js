import controllers from '../controllers';
import auth from '../middlewares/auth';

// API routes

export default (app) => {
  // base API
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Post IT API!',
  }));

  // API route to handle user sign up
  app.post('/api/user/signup', controllers.users.signup);
  // API route to handle user sign in
  app.post('/api/user/signin', controllers.users.login);
  // API to get all users
  app.get('/api/users', auth, controllers.users.findAll);
  // API route to search users
  app.get('/api/user/:username/find', auth, controllers.users.searchUsers);
  // API route to get a user and group details
  app.get('/api/users/one', auth, controllers.users.findCurrentUser);
  // API for logged in users to retrieve messages in their group
  app.get(
    '/api/group/:group_id/messages', auth, controllers.groups.fetchMessage);
  // API route to update message readby
  app.patch('/api/message/readby', auth, controllers.messages.updateReadBy);
  // API route to reset user's password
  app.patch('/api/user/reset', controllers.users.resetUserPassword);

  // API to create new group
  app.post('/api/group', auth, controllers.groups.create);
  // API route for users to add other users to groups:
  app.post('/api/group/:group_id/user', auth, controllers.groups.addUser);

  // API for logged in users to post messages to a group
  app.post(
    '/api/group/:group_id/message', auth, controllers.groups.postMessage);
};
