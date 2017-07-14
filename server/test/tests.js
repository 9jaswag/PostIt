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
  truncate: true
});
models.Message.destroy({
  where: {},
  cascade: true,
  truncate: true
});
models.Group.destroy({
  where: {},
  cascade: true,
  truncate: true
});
models.UserGroup.destroy({
  where: {},
  cascade: true,
  truncate: true
});

describe('PostIT Tests:', () => {
  describe('Creating Data:', () => {
    it('POST /api/user/signup creates a new user', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'bootcamp',
          email: 'test@bootcamp.com',
          password: 'testpass'
        })
        .end((err, res) => {
          res.body.token.should.not.equals(null);
          res.should.have.status(201);
          token = res.body.token;
          done();
        });
    });
    it('POST /api/user/signin logs in a new user', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'bootcamp',
          password: 'testpass'
        })
        .end((err, res) => {
          res.should.have.status(202);
          res.body.token.should.not.equals(null);
          res.decode.username.should.equals('andela');
          done();
        });
    });
    it('POST /api/group creates a new group', (done) => {
      chai.request(app)
        .post('/api/group')
        .type('form')
        .send({
          name: 'Andela Group',
          owner: 'chuks',
          description: 'An Andela Group',
          token
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.name.should.equal('Andela Group');
          done();
        });
    });
    it('POST /api/group/:group_id/message should add a new group message', (done) => {
      chai.request(app)
        .post('/api/group/1/message')
        .type('form')
        .send({
          message: 'The call to step up',
          priority: 'urgent',
          author: 'chuks',
          user_id: 1,
          token
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.message.message.should.equal('The call to step up');
          done();
        });
    });
    it('POST /api/groups/:id/user should add a user to group', (done) => {
      chai.request(app)
        .post('/api/groups/1/user')
        .type('form')
        .send({
          userId: '1',
          groupId: '1',
          token
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.user_id.should.equal('1');
          done();
        });
    });
  });
  describe('Retrieving Data', () => {
    it('GET /api/groups/ does get all created groups', (done) => {
      chai.request(app)
        .get(`/api/groups/?token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('GET /api/groups/:group_id/messages/ does get all messages in a group', (done) => {
      chai.request(app)
        .get(`/api/groups/1/messages/?token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('GET /api/users/ should get all registered users', (done) => {
      chai.request(app)
        .get(`/api/users/?token=${token}`)
        .end((err, res) => {
          res.status.should.equals(200);
          res.body.length.should.equals(1);
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('Protected Routes', () => {
    it('POST /api/groups/ is protected', (done) => {
      chai.request(app)
        .post('/api/groups/')
        .type('form')
        .send({
          name: 'Andela Bootcamp',
          owner: 'Andela',
          description: 'A group text'
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('POST /api/groups/:group_id/user is protected', (done) => {
      chai.request(app)
        .post('/api/groups/:id/user')
        .type('form')
        .send({
          userId: '1',
          groupId: '1',
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('POST /api/groups/:id/message/ is protected', (done) => {
      chai.request(app)
        .post('/api/groups/1/message/')
        .type('form')
        .send({
          message: 'A very long message',
          priority: 'urgent',
          author: 'chuks',
          groupId: 1,
          userId: 1
        })
        .end((err, res) => {
          res.status.should.equal(401);
          done();
        });
    });
    it('Non existing route returns error', (done) => {
      chai.request(app)
        .post('/api/use')
        .type('form')
        .send({
          
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('User not authenticated. Failed to authenticate token.');
          done();
        });
    });
  });
  describe('Input Validation', () => {
    it('POST /api/user/signup', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: ''
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Please choose a username');
          done();
        });
    });
    it('POST /api/user/signin', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: ''
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Please enter a username');
          done();
        });
    });
    it('POST /api/group', (done) => {
      chai.request(app)
        .post('/api/group')
        .type('form')
        .send({
          name: '',
          token
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.equal('Please choose a group name');
          done();
        })
    });
    it('POST /api/group/:group_id/user', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .type('form')
        .send({
          token
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('a User ID is required');
          done();
        })
    });
    it('POST /api/group/:group_id/message', (done) => {
      chai.request(app)
        .post('/api/group/1/message')
        .type('form')
        .send({
          token
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.equal('Message can not be empty');
          done();
        })
    });
  });
});
