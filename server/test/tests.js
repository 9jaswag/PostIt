import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import app from '../app';
import models from '../models';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;

models.User.destroy({
  where: {},
  cascade: true,
  truncate: true,
  restartIdentity: true
});
models.Message.destroy({
  where: {},
  cascade: true,
  truncate: true,
  restartIdentity: true
});
models.Group.destroy({
  where: {},
  cascade: true,
  truncate: true,
  restartIdentity: true
});
models.UserGroup.destroy({
  where: {},
  cascade: true,
  truncate: true,
  restartIdentity: true
});

describe('PostIT API Tests:', () => {

  describe('Base API', () => {
    it('Displays welcome message', (done) => {
      chai.request(app)
        .get('/api')
        .type('form')
        .end((err, res) => {
          res.body.message.should.equals('Welcome to the Post IT API!');
          done();
        });
    });
  });
  describe('Signup API route', () => {
    it('Registers a new user when complete parameters are provided', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chuks@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('Returns 400 error and error message with no username parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          email: 'chuks@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.username.should.equals('Username field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with no email parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with no password parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chuks@andela.com',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.password.should.equals('Password field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with no phone parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chuks@andela.com',
          password: 'chukspass'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.phone.should.equals('Phone field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with a duplicate username', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chukss@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.username.should.equals('Username already exists');
          done();
        });
    });
    it('Returns 400 error and error message with a duplicate email address', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'chuks@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address already exists');
          done();
        });
    });
    it('Returns 400 error and error message with an invalid email address', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'funsho',
          email: 'funshoandela.com',
          password: 'funshopass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address is invalid');
          done();
        });
    });
    it('Returns 400 error and error message with an empty username field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: '  ',
          email: 'dave@andela.com',
          password: 'davepass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.username.should.equals('Username field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with an empty email field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: '   ',
          password: 'davepass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with an empty password field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'dave@andela.com',
          password: '   ',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.password.should.equals('Password field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with an empty phone field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'dave@andela.com',
          password: 'davepass',
          phone: '  '
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.phone.should.equals('Phone field cannot be empty');
          done();
        });
    });
  });
  describe('Signin API route', () => {
    it('Successful signin should return 200 status code', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspass',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('Successful signin should return a token', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspass',
        })
        .end((err, res) => {
          res.body.data.should.have.property('token');
          token = res.body.data.token;
          done();
        });
    });
    it('Returns error message when no username is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          password: 'chukspass',
        })
        .end((err, res) => {
          res.body.errors.username.should.equals('Username field cannot be empty');
          done();
        });
    });
    it('Returns error message when no password is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
        })
        .end((err, res) => {
          res.body.errors.password.should.equals('Password field cannot be empty');
          done();
        });
    });
    it('Returns error message when none existing username is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chukss',
          password: 'chukspass'
        })
        .end((err, res) => {
          res.body.errors.username.should.equals('User does not exist');
          done();
        });
    });
    it('Returns error message when wrong password is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspasss'
        })
        .end((err, res) => {
          res.body.errors.password.should.equals('Incorrect password!');
          done();
        });
    });
  });
  describe('API route find all Users', () => {
    it('returns error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/users')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals('User not authenticated. Failed to authenticate token.');
          done();
        });
    });
    it('returns an array of user objects when token is valid', (done) => {
      chai.request(app)
        .get('/api/users/')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.user.should.be.an('array');
          res.body.data.user[0].should.be.an('object');
          done();
        });
    });
  });
  describe('API route to fetch logged in user details with group info', () => {
    it('returns error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/users/one')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals('User not authenticated. Failed to authenticate token.');
          done();
        });
    });
    it('returns logged in user object with group info when token is valid', (done) => {
      chai.request(app)
        .get('/api/users/one')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an('object');
          res.body.data.Groups.should.be.an('array');
          done();
        });
    });
  });
  describe('Search user API route', () => {
    it('returns error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/user/chuks/find')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals('User not authenticated. Failed to authenticate token.');
          done();
        });
    });
    it('returns logged in user object with group info when token is valid', (done) => {
      chai.request(app)
        .get('/api/user/chuks/find')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.an('array');
          res.body.data[0].should.be.an('object');
          done();
        });
    });
  });
  describe('Create group API route', () => {
    it('returns error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/group')
        .type('form')
        .send({
          name: 'Andela Bootcamp',
          description: 'A little group description'
        })
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals('User not authenticated. Failed to authenticate token.');
          done();
        });
    });
    it('returns error if no parameter is provided', (done) => {
      chai.request(app)
        .post('/api/group')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.name.should.equals('Please choose a group name');
          res.body.errors.description.should.equals('Please enter a description of the group');
          done();
        });
    });
    it('creates a group if all parameters are provided', (done) => {
      chai.request(app)
        .post('/api/group')
        .type('form')
        .set('x-access-token', token)
        .send({
          name: 'Andela Bootcamp',
          description: 'A little group description'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.group.name.should.equals('Andela Bootcamp');
          res.body.data.group.description.should.equals('A little group description');
          done();
        });
    });
    it('returns error if provided group name already exists', (done) => {
      chai.request(app)
        .post('/api/group')
        .type('form')
        .set('x-access-token', token)
        .send({
          name: 'Andela Bootcamp',
          description: 'A little group description'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.group.should.equals('Group already exists');
          done();
        });
    });
  });
  describe('API route for adding users to a group', () => {
    before((done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'dave@andela.com',
          password: 'davepass',
          phone: '77033130448'
        })
        .end((err, res) => {
          done();
        });
      console.log('=====::::::==>');
    });
    it('returns error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals('User not authenticated. Failed to authenticate token.');
          done();
        });
    });
    it('returns error if no user id is provided', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equals('a User ID is required');
          done();
        });
    });
    it('returns error if user id is provided does not exist', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 8
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equals('User does not exist');
          done();
        });
    });
    it('returns error if group id is provided does not exist', (done) => {
      chai.request(app)
        .post('/api/group/7/user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 2
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.message.should.equals('Group does not exist');
          done();
        });
    });
    it('returns error if user id is provided already belongs to the group', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equals('User already belongs to this group');
          done();
        });
    });
    it('adds the user to the group', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 4
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.usergroup.userId.should.equals(4);
          res.body.data.usergroup.groupId.should.equals(1);
          done();
        });
    });
  });
});
