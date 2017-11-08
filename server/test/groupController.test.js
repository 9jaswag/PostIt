import chaiHttp from 'chai-http';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import app from '../app';
import userData from './data/userData';
import groupData from './data/groupData';
import messageData from './data/messageData';
import generateToken from '../../helpers/generateToken';

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
let token;
let userToken;
let fakeToken;

describe('Group controller test', () => {
  const { user } = userData;
  const { group } = groupData;
  const { message } = messageData;
  before(() => {
    token = generateToken(user.demoUser);
  });
  describe('Create group route', () => {
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .type('form')
        .send({
          name: group.name,
          description: group.description
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return status 400 if no parameter is provided', (done) => {
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
    it('should create a group', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .type('form')
        .set('x-access-token', token)
        .send({
          name: group.name,
          description: group.description
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equals('Your group has been created.');
          res.body.data.group.name.should.equals('Andela Bootcamp');
          res.body.data.group.description.should.equals(
            'A little group description');
          done();
        });
    });
    it('should return status 409 for existing group', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .type('form')
        .set('x-access-token', token)
        .send({
          name: group.name,
          description: group.description
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.errors.group.should.equals('Group already exists');
          done();
        });
    });
  });
  describe('Add user route', () => {
    before((done) => {
      fakeToken = jwt.sign({
        id: user.id,
        email: user.secondEmail,
        username: user.secondUsername,
        phone: user.secondPhone
      }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
      done();
    });
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return status 400 for missing user id', (done) => {
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
    it('should return status 404 if user is not found', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.wrongId
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equals('User does not exist');
          done();
        });
    });
    it('should return status 404 if group is not found', (done) => {
      chai.request(app)
        .post('/api/v1/group/7/user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.id
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equals('Group does not exist');
          done();
        });
    });
    it('should return status 409 if user already belongs to the group',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .type('form')
          .set('x-access-token', token)
          .send({
            userId: user.id
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.error.should.equals(
              'User already belongs to this group');
            done();
          });
      });
    it('should return status 400 for missing group id', (done) => {
      chai.request(app)
        .post('/api/v1/group/ /user')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.id
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
          userId: user.secondId
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equals('User successfully added to group');
          res.body.group.userId.should.equals(3);
          res.body.group.groupId.should.equals(1);
          done();
        });
    });
    it('should return status 404 if token decoded user does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .type('form')
          .set('x-access-token', fakeToken)
          .send({
            userId: user.secondId
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.error.should.equals('User does not exist');
            done();
          });
      });
  });
  describe('Post message route', () => {
    before(() => {
      userToken = generateToken(user.demoUser2);
    });
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return status 500 if group id type is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/group/ /message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: message.title,
          message: message.message,
          priority: message.criticalPriority
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.error.should.equals('invalid input syntax for integer: " "');
          done();
        });
    });
    it('should return status 400 for missing message title', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should
            .equals('Message title can not be empty');
          done();
        });
    });
    it('should return status 400 for missing message body', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: message.title
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.message.should.equals('Message can not be empty');
          done();
        });
    });
    it('should return status 404 if group does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/group/44/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: message.title,
          message: message.message
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equals('That group does not exist');
          done();
        });
    });
    it('should set message priority to normal as default', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: message.title,
          message: message.message
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.priority.should.equals('normal');
          done();
        });
    });
    it('should return status 401 if user isn\'t group member', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', userToken)
        .send({
          title: message.title,
          message: message.message,
          priority: message.criticalPriority
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should
            .equals('Only group members can post messages to group');
          done();
        });
    });
    it('should send message', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: message.title,
          message: message.message,
          priority: message.criticalPriority
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equals('Message sent');
          res.body.data.message.priority.should.equals('critical');
          res.body.data.message.title.should.equals('A message title');
          res.body.data.message.message.should.equals('a message body');
          res.body.data.message.author.should.equals('chuks');
          done();
        });
    });
    it('should send email if message priority is urgent', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: message.title,
          message: message.message,
          priority: message.urgentPriority
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.priority.should.equals('urgent');
          res.body.message.should.equals('Message sent');
          done();
        });
    });
    it('should send email if message priority is critical', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .type('form')
        .set('x-access-token', token)
        .send({
          title: message.title,
          message: message.message,
          priority: message.criticalPriority
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.priority.should.equals('critical');
          res.body.message.should.equals('Message sent');
          done();
        });
    });
  });
  describe('Fetch message route', () => {
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/messages')
        .type('form')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return status 400 for wrong group id type', (done) => {
      chai.request(app)
        .get('/api/v1/group/e/messages')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.id
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should.equals('a Group ID is required');
          done();
        });
    });
    it('should return status 404 if group does not exist', (done) => {
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
    it('should return status 401 if user isn\'t a group member', (done) => {
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
    it('should return an an array of messages', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/messages')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.an('array');
          res.body.message[0].should.have.property('title')
            .equals('A message title');
          done();
        });
    });
  });
  describe('Remove user route', () => {
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .patch('/api/v1/group/1/remove')
        .type('form')
        .send({
          userId: user.id,
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return status 400 for missing group id', (done) => {
      chai.request(app)
        .patch('/api/v1/group/1/remove')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.error.should
            .equals('User and group id must be provided');
          done();
        });
    });
    it('should return status 404 if group does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/group/111/remove')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.id
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should
            .equals('User or group does not exist');
          done();
        });
    });
    it('should return status 404 if user does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/group/1/remove')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.nonExistingId
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should
            .equals('User or group does not exist');
          done();
        });
    });
    it('should remove a user', (done) => {
      chai.request(app)
        .patch('/api/v1/group/1/remove')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.id
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.removedUser.should.equals(1);
          done();
        });
    });
    it('should return status 500 for invalid group type', (done) => {
      chai.request(app)
        .patch('/api/v1/group/err/remove')
        .type('form')
        .set('x-access-token', token)
        .send({
          userId: user.id
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.error.should
            .equals('invalid input syntax for integer: "err"');
          done();
        });
    });
  });
  describe('Get group member count route', () => {
    it('should return status 401 if token is not in request header', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/count')
        .type('form')
        .send({
          userId: user.id,
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equals('Invalid access token.');
          done();
        });
    });
    it('should return status 404 if group does not exist', (done) => {
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
    it('should return status 500 for invalid group type', (done) => {
      chai.request(app)
        .get('/api/v1/group/ /count')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.error.should
            .equals('invalid input syntax for integer: " "');
          done();
        });
    });
    it('should return group member count of a group', (done) => {
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

