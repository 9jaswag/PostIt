// Group controller test

import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import app from '../app';
import models from '../models';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;
let userToken;
let fakeToken;

describe('Group controller test', () => {
  before((done) => {
    // runs before all tests in this block
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
  describe('Create group API route', () => {
    it('should return error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .type('form')
        .send({
          name: 'Andela Bootcamp',
          description: 'A little group description'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return an error if no parameter is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.name.should.equals('Please choose a group name');
          res.body.errors.description.should.equals(
            'Please enter a description of the group');
          done();
        });
    });
    it('should create a group if all parameters are provided', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .type('form')
        .set('x-access-token', token)
        .send({
          name: 'Andela Bootcamp',
          description: 'A little group description'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.group.name.should.equals('Andela Bootcamp');
          res.body.data.group.description.should.equals(
            'A little group description');
          done();
        });
    });
    it('should return an error if provided group name already exists',
      (done) => {
        chai.request(app)
          .post('/api/v1/group')
          .type('form')
          .set('x-access-token', token)
          .send({
            name: 'Andela Bootcamp',
            description: 'A little group description'
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.errors.group.should.equals('Group already exists');
            done();
          });
      });
  });
  describe('API route for adding users to a group', () => {
    before((done) => {
      fakeToken = jwt.sign({
        id: 'user.id',
        email: 'user.email',
        username: 'user.username',
        phone: 'user.phone'
      }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
      done();
    });
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return an error if no user id is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equals('a User ID is required');
          done();
        });
    });
    it('should return an error if user id provided does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: 8
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.should.equals('User does not exist');
            done();
          });
      });
    it('should return an error if group id provided does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/7/user')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: 2
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.should.equals('Group does not exist');
            done();
          });
      });
    it('should return an error if user already belongs to the group',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: 1
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.error.should.equals(
              'User already belongs to this group');
            done();
          });
      });
    it('should return error if group id is missing', (done) => {
      chai.request(app)
        .post('/api/v1/group/ /user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 4
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equals('a Group ID is required');
          done();
        });
    });
    it('should add a user to the group', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 3
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equals('User successfully added to group');
          res.body.group.userId.should.equals(3);
          res.body.group.groupId.should.equals(1);
          done();
        });
    });
    it('should add an error if user does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .type('form')
        .set('x-access-token', fakeToken)
        .send({
          userId: 3
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equals('User does not exist');
          done();
        });
    });
  });
  describe('API route for posting message to a group', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .type('form')
        .send({
          username: 'funsho',
          email: 'funsho@andela.com',
          password: 'funshopass',
          phone: '2347033130559'
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          userToken = res.body.token;
          done();
        });
    });
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return an error if no group is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group/ /message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: 'A message title',
          message: 'a message body',
          priority: 'critical'
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('should return an error message if message title is not provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/message')
          .type('form')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.message.should.equals(
              'Message title can not be empty');
            done();
          });
      });
    it('should return an error message if message body is not provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/message')
          .type('form')
          .set('x-access-token', token)
          .send({
            title: 'A message title'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.message.should.equals('Message can not be empty');
            done();
          });
      });
    it('should return an error message if group id provided does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/44/message')
          .type('form')
          .set('x-access-token', token)
          .send({
            title: 'A message title',
            message: 'a message body'
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.should.equals('That group does not exist');
            done();
          });
      });
    it('should set message priority to normal if it is not provided',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/message')
          .type('form')
          .set('x-access-token', token)
          .send({
            title: 'A message title',
            message: 'a message body'
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.data.message.priority.should.equals('normal');
            done();
          });
      });
    it('should return error if user isn\'t group member', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', userToken)
        .send({
          title: 'A message title',
          message: 'a message body',
          priority: 'critical'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Only group members can post messages to group');
          done();
        });
    });
    it('should send message if all parameters are provided', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: 'A message title',
          message: 'a message body',
          priority: 'critical'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.priority.should.equals('critical');
          res.body.data.message.title.should.equals('A message title');
          res.body.data.message.message.should.equals('a message body');
          res.body.data.message.author.should.equals('chuks');
          done();
        });
    });
    it('should send email if message is urgent', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: 'A message title',
          message: 'a message body',
          priority: 'urgent'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.priority.should.equals('urgent');
          res.body.message.should.equals('Message sent');
          done();
        });
    });
    it('should send email if message is critical', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: 'A message title',
          message: 'a message body',
          priority: 'critical'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.priority.should.equals('critical');
          res.body.message.should.equals('Message sent');
          done();
        });
    });
  });
  describe('API route for feching messages', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/messages')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return an error if wrong group id type is provided',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/e/messages')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: 2
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.equals('a Group ID is required');
            done();
          });
      });
    it('should return an error message if group id provided does not exist',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/44/messages')
          .type('form')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.should.equals('Group does not exist');
            done();
          });
      });
    it('should return an an error if user isn\'t a group member',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/1/messages')
          .type('form')
          .set('x-access-token', userToken)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.error.should.equals('Only group members visit a group');
            done();
          });
      });
    it('should return an an array of messages if all parameters are correct',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/1/messages')
          .type('form')
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.be.an('array');
            res.body.message[0].should.be.an('object');
            done();
          });
      });
  });
  describe('API route for removing users from a group', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/group/1/remove')
        .type('form')
        .send({
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return an an error if no user id is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/group/1/remove')
        .type('form')
        .set('x-access-token', token)
        .send({
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'User and group id must be provided');
          done();
        });
    });
    it('should return an an error if no non-existing group id is provided',
      (done) => {
        chai.request(app)
          .patch('/api/v1/group/111/remove')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: 1
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.error.should.equals(
              'User or group does not exist');
            done();
          });
      });
    it('should return an an error if no non-existing user id is provided',
      (done) => {
        chai.request(app)
          .patch('/api/v1/group/1/remove')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: 111
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.error.should.equals(
              'User or group does not exist');
            done();
          });
      });
    it('should remove a user when correct details are provided', (done) => {
      chai.request(app)
        .patch('/api/v1/group/1/remove')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 1
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.removedUser.should.equals(1);
          done();
        });
    });
    it('should return 500 error', (done) => {
      chai.request(app)
        .patch('/api/v1/group/err/remove')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: 1
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe('API route for getting group member count', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/count')
        .type('form')
        .send({
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals(
            'Invalid access token.');
          done();
        });
    });
    it('should return an error if non-existent group is provided', (done) => {
      chai.request(app)
        .get('/api/v1/group/222/count')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equals('Group does not exist');
          done();
        });
    });
    it('should return an error if no group is provided', (done) => {
      chai.request(app)
        .get('/api/v1/group/ /count')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it('should return the member count of a group', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/count')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.group.should.equals(3);
          done();
        });
    });
  });
});

