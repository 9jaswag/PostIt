// User controller test

import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import userData from './data/userData';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;
let resetToken;

describe('User Controller Test', () => {
  const { user } = userData;
  describe('User signup API route', () => {
    it('should register a new user when all parameters are provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.message.should.equals('Sign up succesful.');
            done();
          });
      });
    it('should return 400 error and error message with short password',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.username,
            email: user.email,
            password: user.shortPassword,
            phone: user.phone
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
            username: user.username,
            email: user.password,
            password: user.password,
            phone: user.phoneText
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
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.emptyString
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.phone.should.equals(
              'Phone field cannot be empty');
            done();
          });
      });
    it('should return error message for empty username parameter',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.emptyString,
            email: user.email,
            password: user.password,
            phone: user.phone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.username.should.equals(
              'Username field cannot be empty');
            done();
          });
      });
    it('should return error message for empty email parameter',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.username,
            email: user.emptyString,
            password: user.password,
            phone: user.phone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.email.should.equals(
              'Email address field cannot be empty');
            done();
          });
      });
    it('should return error message for empty password parameter',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.username,
            password: user.emptyString,
            email: user.email,
            phone: user.phone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.password.should.equals(
              'Password field cannot be empty');
            done();
          });
      });
    it('should return error message for a duplicate username',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.username,
            email: user.secondEmail,
            password: user.password,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.errors.username.should.equals('Username already exists');
            done();
          });
      });
    it('should return error message for a duplicate email address',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            email: user.email,
            password: user.password,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.errors.email.should.equals('Email address already exists');
            done();
          });
      });
    it('should return error message for an invalid email address',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            email: user.invalidEmail,
            password: user.password,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(500);
            res.body.errors.email.should.equals('Email address is invalid');
            done();
          });
      });
    it('should return an error message for an empty username string',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.emptyString,
            email: user.secondEmail,
            password: user.password,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.username.should.equals(
              'Username field cannot be empty');
            done();
          });
      });
    it('should return an error message for an empty email string',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            email: user.emptyString,
            password: user.password,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.email.should.equals(
              'Email address field cannot be empty');
            done();
          });
      });
    it('should return an error message for an empty password string',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            email: user.secondPhone,
            password: user.emptyString,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.password.should.equals(
              'Password field cannot be empty');
            done();
          });
      });
    it('should return an error message for an empty phone string',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            email: user.secondEmail,
            password: user.password,
            phone: user.emptyString
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
          username: user.username,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equals('Sign in successful');
          done();
        });
    });
    it('should sign in a user and return a token', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .type('form')
        .send({
          username: user.username,
          password: user.password,
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          token = res.body.token;
          done();
        });
    });
    it('should return an error message if no username is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            password: user.password,
          })
          .end((err, res) => {
            res.body.errors.username.should.equals(
              'Username field cannot be empty');
            done();
          });
      });
    it('should return an error message if no password is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            username: user.username,
          })
          .end((err, res) => {
            res.body.errors.password.should.equals(
              'Password field cannot be empty');
            done();
          });
      });
    it('should return an error message if non-existent username is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            username: user.secondUsername,
            password: user.password
          })
          .end((err, res) => {
            res.body.errors.username.should.equals('User does not exist');
            done();
          });
      });
    it('should return an error message if wrong password is provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            username: user.username,
            password: user.secondPhone
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
            username: user.username,
            password: user.shortPassword
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
        .post('/api/v1/user/find')
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
        .post('/api/v1/user/find')
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
        .post('/api/v1/user/find')
        .type('form')
        .send({
          username: user.secondUsername
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
        .post('/api/v1/user/find')
        .type('form')
        .send({
          username: user.username
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
        .get('/api/v1/user/group')
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
    it('should return a user\'s group with unread messages ', (done) => {
      chai.request(app)
        .get('/api/v1/user/group')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.groups[0].should.have.property('group');
          res.body.groups[0].group.name.should.equals('Group 1');
          res.body.groups[0].unreadCount.should.equals(1);
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
          .get(`/api/v1/user/search?username=${user.username}`)
          .type('form')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.pagination.count.should.equals(1);
            res.body.users[0].should.be.an('object');
            res.body.users[0].username.should.equals('chuks');
            done();
          });
      });
    it('should return error if user is not found',
      (done) => {
        chai.request(app)
          .get(`/api/v1/user/search?username=${user.secondUsername}`)
          .type('form')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.should.equals('User was not found');
            done();
          });
      });
  });
  describe('Reset password API route', () => {
    it('should return an error if no email is provided',
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
    it('should return an error if no request type is provided',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .send({
            email: user.email
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equals('Request type must be specified');
            done();
          });
      });
    it('should return an error if wrong request type is provided',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .send({
            email: user.email,
            type: user.wrongRequestType
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equals('Invalid request type');
            done();
          });
      });
    it('should return an error if user is not found',
      (done) => {
        chai.request(app)
          .patch('/api/v1/user/reset')
          .type('form')
          .send({
            email: user.secondEmail,
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
            email: user.email,
            type: user.requestReset
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
          email: user.email,
          type: user.resetRequestType,
          password: user.password,
          token: resetToken
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equals('Password reset successful');
          done();
        });
    });
    it('should return an error if no password is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: user.email,
          type: user.resetRequestType,
          token: resetToken
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('Provide a new password');
          done();
        });
    });
    it('should return an error if no reset token is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: user.email,
          type: user.resetRequestType,
          password: user.password
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('No token is provided');
          done();
        });
    });
    it('should return an error if wrong reset token is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: user.email,
          type: user.resetRequestType,
          password: user.password,
          token: user.wrongToken
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('Invalid token');
          done();
        });
    });
  });
});
