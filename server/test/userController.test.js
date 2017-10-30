// User controller test

import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import models from '../models';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;
let resetToken;

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

describe('User Controller Test', () => {
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
    it('should return 400 error and error message with short password',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'chuks',
            email: 'chuks@andela.com',
            password: 'chuks',
            phone: '2347033130448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.password.should.equals(
              'Password length must be more than 6 characters');
            done();
          });
      });
    it('should return error message for failed phone validation',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'chuks',
            email: 'chuks@andela.com',
            password: 'chuks',
            phone: '2347033err0448'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.phone.should.equals(
              'Phone number cannot contain text');
            done();
          });
      });
    it('should return error message for empty phone field',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: 'chuks',
            email: 'chuks@andela.com',
            password: 'chuks',
            phone: ''
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.phone.should.equals(
              'Phone field cannot be empty');
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
            res.should.have.status(409);
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
            res.should.have.status(409);
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
            res.should.have.status(500);
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
          res.body.should.have.property('token');
          token = res.body.token;
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
    it('should return an error message is password is less than 6 characters',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            username: 'chuks',
            password: 'chuks'
          })
          .end((err, res) => {
            res.body.errors.password.should.equals(
              'Password length must be more than 6 characters');
            done();
          });
      });
  });
  describe('API route to find a User', () => {
    it('should return error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/user')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return error if username is not provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/user')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equals('Username is required');
          done();
        });
    });
    it('should return message if user is not found', (done) => {
      chai.request(app)
        .post('/api/v1/users/user')
        .type('form')
        .send({
          username: 'funsho'
        })
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equals('user not found');
          done();
        });
    });
    it('should return an array of user objects when token is valid', (done) => {
      chai.request(app)
        .post('/api/v1/users/user')
        .type('form')
        .send({
          username: 'chuks'
        })
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.user.should.be.an('object');
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
            res.should.have.status(401);
            res.body.message.should.equals(
              'Invalid access token.');
          }
          done();
        });
    });
  });
  describe('Search user API route', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/user/search')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return user object with group info when token is valid',
      (done) => {
        chai.request(app)
          .get('/api/v1/user/search?username=chuks')
          .type('form')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.user.count.should.equals(1);
            res.body.user.should.be.an('object');
            done();
          });
      });
  });
  describe('Reset password API route', () => {
    it('should return 404 error if no email is provided',
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
    it('should return 404 error if no request type is provided',
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
    it('should return 404 error if wrong request type is provided',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .send({
            email: 'chuks@andela.com',
            type: 'rejoin'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equals('Invalid request type');
            done();
          });
      });
    it('should return 404 error if user is not found',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .send({
            email: 'dave@andela.com',
            type: 'request'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.username.should.equals(
              'No user with this email address');
            resetToken = res.body.resetToken;
            done();
          });
      });
    it('should send an email to the  user with reset link',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .send({
            email: 'chuks@andela.com',
            type: 'request'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.equals('Email sent');
            resetToken = res.body.resetToken;
            done();
          });
      });
    it('should update the user\'s password', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: 'chuks@andela.com',
          type: 'reset',
          password: 'chukspass',
          token: resetToken
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equals('Password reset successful');
          done();
        });
    });
    it('should return 400 error if no password is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: 'chuks@andela.com',
          type: 'reset',
          token: resetToken
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('Provide a new password');
          done();
        });
    });
    it('should return 400 error if token is not provided', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: 'chuks@andela.com',
          type: 'reset',
          password: 'newpass'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('No token is provided');
          done();
        });
    });
    it('should return 400 error if wrong token is not provided', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: 'chuks@andela.com',
          type: 'reset',
          password: 'newpass',
          token: 'wrong token'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('Invalid token');
          done();
        });
    });
  });
});
