import controllers from '../controllers';
import auth from '../middlewares/auth';

export default (app) => {
  // base API
  app.get('/api/v1', (req, res) => res.status(200).send({
    message: 'Welcome to the Post IT API!',
  }));

  // API route to handle user sign up
  app.post('/api/v1/user/signup', controllers.users.signup);
  // API route to handle user sign in
  app.post('/api/v1/user/signin', controllers.users.login);
  // API to find a user
  app.post('/api/v1/user/find', auth, controllers.users.findUser);
  // API route to search users
  app.get('/api/v1/user/search', auth, controllers.users.searchUsers);
  // API route to get a user and group details
  app.get('/api/v1/user/group', auth, controllers.users.findCurrentUser);
  // API for logged in users to retrieve messages in their group
  app.get(
    '/api/v1/group/:group_id/messages', auth, controllers.groups.fetchMessage);
  // API route to update message readby
  app.patch('/api/v1/message/readby', auth, controllers.messages.updateReadBy);
  // API route to reset user's password
  app.patch('/api/v1/user/reset', controllers.users.resetUserPassword);
  // API to create new group
  app.post('/api/v1/group', auth, controllers.groups.createGroup);
  // API route for users to add other users to groups:
  app.post('/api/v1/group/:group_id/user', auth, controllers.groups.addUser);
  app.patch(
    '/api/v1/group/:group_id/remove', auth, controllers.groups.removeUser
  );
  app.get('/api/v1/group/:group_id/count', auth,
    controllers.groups.getMemberCount);
  // API for logged in users to post messages to a group
  app.post(
    '/api/v1/group/:group_id/message', auth, controllers.groups.postMessage);
};
