const userController = require('../controllers').users;

module.exports = (app) => {
  // base API
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Post IT API!',
  }));

  // API to handle user sign up
  app.post('/api/user/signup', userController.signup);
}