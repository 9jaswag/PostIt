// Group controller test

import chaiHttp from 'chai-http';
import chai from 'chai';
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
        res.body.data.should.have.property('token');
        token = res.body.data.token;
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
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
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
            res.should.have.status(400);
            res.body.errors.group.should.equals('Group already exists');
            done();
          });
      });
  });
  describe('API route for adding users to a group', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'dave@andela.com',
          password: 'davepass',
          phone: '2347033130449'
        })
        .end(() => {
          done();
        });
    });
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
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
    it('should return an error if user id is provided does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
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
    it('should return an error if group id is provided does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/7/user')
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
    it('should return an error if user id is provided already belongs to the group',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: 1
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.error.message.should.equals(
              'User already belongs to this group');
            done();
          });
      });
    it('should add a user to the group', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
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
  describe('API route for posting message to a particular group', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
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
            res.should.have.status(401);
            res.body.error.message.should.equals('That group does not exist');
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
  });
  describe('API route for feching messages', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/messages')
        .type('form')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
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
            res.should.have.status(401);
            res.body.error.message.should.equals('Group does not exist');
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
            res.body.data.should.be.an('array');
            res.body.data[0].should.be.an('object');
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
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
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
          res.body.error.message.should.equals(
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
            res.body.error.message.should.equals(
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
            res.body.error.message.should.equals(
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
          res.should.have.status(403);
          res.body.message.should.equals(
            'User not authenticated. Failed to authenticate token.');
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
          res.body.data.should.equals(2);
          done();
        });
    });
  });
});
