const userController = require('../controllers').users;
const messageController = require('../controllers').messages;

module.exports = (app) => {
  // base API
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Post IT API!',
  }));

  // API route to handle user sign up
  app.post('/api/user/signup', userController.signup);
  // API route to handle user sign in
  app.post('/api/user/login', userController.login);

  // API for logged in users to post messages to a group
  app.post('/api/group/:id/message', messageController.send);
}