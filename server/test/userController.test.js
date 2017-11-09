import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import userData from './data/userData';

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
let token;
let resetToken;

describe('User Controller Test', () => {
  const { user } = userData;
  describe('User signup route', () => {
    it('should register a new user',
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
            res.body.should.have.property('message')
              .equals('Sign up succesful.');
            done();
          });
      });
    it('should return status 400 if password is less than 6 characters',
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
            res.body.errors.should.have.property('password')
              .equals('Password length must be more than 6 characters');
            done();
          });
      });
    it('should return status 400 if phone number contains text',
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
            res.body.errors.should.have.property('phone')
              .equals('Phone number cannot contain text');
            done();
          });
      });
    it('should return status 400 if phone number is an empty string',
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
            res.body.errors.should.have.property('phone')
              .equals('Phone field cannot be empty');
            done();
          });
      });
    it('should return status 400 if username is an empty string',
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
            res.body.errors.should.have.property('username')
              .equals('Username field cannot be empty');
            done();
          });
      });
    it('should return status 400 if email is an empty string',
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
            res.body.errors.should.have.property('email')
              .equals('Email address field cannot be empty');
            done();
          });
      });
    it('should return status 400 if password is an empty string',
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
    it('should return status 409 for existing username',
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
            res.body.errors.should.have.property('username')
              .equals('Username already exists');
            done();
          });
      });
    it('should return status 409 for existing email address',
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
            res.body.errors.should.have.property('email')
              .equals('Email address already exists');
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
            res.body.errors.should.have.property('email')
              .equals('Email address is invalid');
            done();
          });
      });
    it('should return status 400 for missing username',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            email: user.secondEmail,
            password: user.password,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.should.have.property('username')
              .equals('Username field cannot be empty');
            done();
          });
      });
    it('should return status 400 for missing email',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            password: user.password,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.should.have.property('email')
              .equals('Email address field cannot be empty');
            done();
          });
      });
    it('should return status 400 for missing password',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            email: user.secondPhone,
            phone: user.secondPhone
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.should.have.property('password')
              .equals('Password field cannot be empty');
            done();
          });
      });
    it('should return status 400 for missing phone number',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup')
          .type('form')
          .send({
            username: user.secondUsername,
            email: user.secondEmail,
            password: user.password,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.should.have.property('phone')
              .equals('Phone field cannot be empty');
            done();
          });
      });
  });
  describe('User sign in route', () => {
    it('should sign in a user', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .type('form')
        .send({
          username: user.username,
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').equals('Sign in successful');
          done();
        });
    });
    it('should return a JSON Web Token after successful sign in', (done) => {
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
    it('should return status 400 for missing username', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .type('form')
        .send({
          password: user.password,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.should.have.property('username')
            .equals('Username field cannot be empty');
          done();
        });
    });
    it('should return status 400 for missing password', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .type('form')
        .send({
          username: user.username,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.should.have.property('password')
            .equals('Password field cannot be empty');
          done();
        });
    });
    it('should return status 404 if username is not found', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .type('form')
        .send({
          username: user.secondUsername,
          password: user.password
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.errors.should.have.property('username')
            .equals('User does not exist');
          done();
        });
    });
    it('should return status 401 if password is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .type('form')
        .send({
          username: user.username,
          password: user.secondPhone
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.errors.should.have.property('password')
            .equals('Incorrect password!');
          done();
        });
    });
    it('should return status 400 if password is less than 6 characters',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signin')
          .type('form')
          .send({
            username: user.username,
            password: user.shortPassword
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.errors.should.have.property('password')
              .equals('Password length must be more than 6 characters');
            done();
          });
      });
  });
  describe('Find user route', () => {
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .post('/api/v1/user/find')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return status 400 for missing username', (done) => {
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
          res.should.have.status(422);
          res.body.message.should.equals('user not found');
          done();
        });
    });
    it('should return a user', (done) => {
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
          res.body.user.should.have.property('username').equals('chuks');
          done();
        });
    });
  });
  describe('Find current user route', () => {
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .get('/api/v1/user/group')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
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
  describe('Search user route', () => {
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .get('/api/v1/user/search')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return a user with group info', (done) => {
      chai.request(app)
        .get(`/api/v1/user/search?username=${user.username}`)
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.pagination.count.should.equals(1);
          res.body.users[0].should.be.an('object');
          res.body.users[0].username.should.equals('chuks');
          res.body.users[0].should.have.property('Groups');
          done();
        });
    });
    it('should return pagination data', (done) => {
      chai.request(app)
        .get(`/api/v1/user/search?username=${user.username}`)
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.pagination.should.have.property('count').equals(1);
          res.body.pagination.should.have.property('numberOfPages').equals(1);
          res.body.pagination.should.have.property('currentPage').equals(1);
          res.body.pagination.should.have.property('usersDisplayed').equals(1);
          res.body.pagination.should.have.property('usersPerPage').equals(2);
          done();
        });
    });
    it('should return error if user is not found', (done) => {
      chai.request(app)
        .get(`/api/v1/user/search?username=${user.secondUsername}`)
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.error.should.equals('User was not found');
          done();
        });
    });
  });
  describe('Reset password route', () => {
    it('should return status 400 if email is missing', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('No email address provided');
          done();
        });
    });
    it('should return status 400 if request type is missing', (done) => {
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
    it('should return status 400 if wrong request type is provided', (done) => {
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
    it('should return status 400 if user is not found', (done) => {
      chai.request(app)
        .patch('/api/v1/user/reset')
        .type('form')
        .send({
          email: user.secondEmail,
          type: 'request'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.username.should
            .equals('No user with this email address');
          resetToken = res.body.resetToken;
          done();
        });
    });
    it('should send an email to the user with reset link', (done) => {
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
    it('should return status 400 if no password is provided', (done) => {
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
    it('should return status 400 if no reset token is provided', (done) => {
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
    it('should return status 400 if wrong reset token is provided', (done) => {
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
