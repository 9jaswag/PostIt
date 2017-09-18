// User controller test

import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import models from '../models';
import customSort from '../../helpers/customSort';

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

describe('User Controller test', () => {
  describe('User signup API route', () => {
    it('should register a new user when complete parameters are provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'chuks',
            email: 'chuks@andela.com',
            password: 'chukspass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
    it('should return 400 error and error message with no username parameter',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            email: 'chuks@andela.com',
            password: 'chukspass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.username.should.equals(
              'Username field cannot be empty');
            done();
          });
      });
    it('should return 400 error and error message with no email parameter',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'chuks',
            password: 'chukspass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.email.should.equals(
              'Email address field cannot be empty');
            done();
          });
      });
    it('should return 400 error and error message with no password parameter',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'chuks',
            email: 'chuks@andela.com',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.password.should.equals(
              'Password field cannot be empty');
            done();
          });
      });
    it('should return 400 error and error message with no phone parameter',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
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
    it('should return 400 error and error message with a duplicate username',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'chuks',
            email: 'chukss@andela.com',
            password: 'chukspass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.username.should.equals('Username already exists');
            done();
          });
      });
    it('should return 400 error and error message with a duplicate email address',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'dave',
            email: 'chuks@andela.com',
            password: 'chukspass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.email.should.equals('Email address already exists');
            done();
          });
      });
    it('should return 400 error and error message with an invalid email address',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'funsho',
            email: 'funshoandela.com',
            password: 'funshopass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.email.should.equals('Email address is invalid');
            done();
          });
      });
    it('should return 400 error and error message with an empty username field',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: '  ',
            email: 'dave@andela.com',
            password: 'davepass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.username.should.equals(
              'Username field cannot be empty');
            done();
          });
      });
    it('should return 400 error and error message with an empty email field',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'dave',
            email: '   ',
            password: 'davepass',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.email.should.equals(
              'Email address field cannot be empty');
            done();
          });
      });
    it('should return 400 error and error message with an empty password field',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'dave',
            email: 'dave@andela.com',
            password: '   ',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.password.should.equals(
              'Password field cannot be empty');
            done();
          });
      });
    it('should return 400 error and error message with an empty phone field',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
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
  describe('User signin API route', () => {
    it('should sign in a user with right log in credentials', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
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
    it('should sign in a user and return a token', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
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
    it('should return an error message when no username is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            password: 'chukspass',
          })
          .end((err, res) => {
            res.body.errors.username.should.equals(
              'Username field cannot be empty');
            done();
          });
      });
    it('should return an error message when no password is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            username: 'chuks',
          })
          .end((err, res) => {
            res.body.errors.password.should.equals(
              'Password field cannot be empty');
            done();
          });
      });
    it('should return an error message when non-existent username is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
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
    it('should return an error message when wrong password is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
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
  describe('API route to find all Users', () => {
    it('should return error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
          done();
        });
    });
    it('should return an array of user objects when token is valid', (done) => {
      chai.request(app)
        .get('/api/v1/users/')
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
  describe('API route to fetch logged in user group info', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/users/one')
        .type('form')
        .end((err, res) => {
          if (!err) {
            res.should.have.status(403);
            res.body.message.should.equals(
              'User not authenticated. Failed to authenticate token.');
          }
          done();
        });
    });
    // it('should return the logged in user\'s group info when token is valid',
    //   (done) => {
    //     chai.request(app)
    //       .get('/api/v1/users/one')
    //       .type('form')
    //       .set('x-access-token', token)
    //       .end((err, res) => {
    //         if (!err) {
    //           res.should.have.status(200);
    //           // res.body.data.should.be.an('object');
    //           // res.body.data[0].should.have.property('unreadCount');
    //         }
    //         done();
    //       });
    //   });
  });
  describe('Search user API route', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/user/search')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
          done();
        });
    });
    it('should return logged in user object with group info when token is valid',
      (done) => {
        chai.request(app)
          .get('/api/v1/user/search?username=chuks')
          .type('form')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.data.count.should.equals(1);
            res.body.data.should.be.an('object');
            done();
          });
      });
  });
  describe('Reset password API route', () => {
    it('should return 404 error with an error message if no email is provided',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equals('No email address provided');
            done();
          });
      });
    it('should return 404 error with an error message if no request type is provided',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .send({
            email: 'chuks@andela.com'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equals('Request type must be specified');
            done();
          });
      });
  });
});
