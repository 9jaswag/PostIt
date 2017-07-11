const userController = require('../controllers').users;
const messageController = require('../controllers').messages;
const groupController = require('../controllers').groups;

module.exports = (app) => {
  // base API
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Post IT API!',
  }));

  // API route to handle user sign up
  app.post('/api/user/signup', userController.signup);
  // API route to handle user sign in
  app.post('/api/user/login', userController.login);
  // API to get all users
  app.get('/api/users', userController.allUsers);

  // API for logged in users to post messages to a group
  app.post('/api/group/:id/message', messageController.send);
  // API for logged in users to retrieve messages in their group
  app.get('/api/group/:id/messages', messageController.fetch); // not working.

  // API to create new group
  app.post('/api/group', groupController.create);
};
