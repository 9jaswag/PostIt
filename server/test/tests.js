import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import models from '../models';
// const User = require('../models').User;

process.env.NODE_ENV = 'test';
const should = chai.should();

chai.use(chaiHttp);

describe('PostIT Tests:', () => {
  beforeEach((done) => { // Before each test we empty the database
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
    done();
  });
  describe('Create data:', () => {
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
          res.body.email.should.equal('test@bootcamp.com');
          res.should.have.status(201);
          done();
        });
    });
    // write sign in after JWT
    it('POST /api/group creates a new group', (done) => {
      chai.request(app)
        .post('/api/group')
        .type('form')
        .send({
          name: 'Andela Group',
          owner: 'chuks',
          description: 'An Andela Group'
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
          user_id: 1
        })
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.message.message.should.equal('The call to step up');
          done();
        });
    });
    it('POST /api/group/1/user adds a user to a group', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .type('form')
        .send({
          userId: 1,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.usergroup.userId.should.equal(1);
          done();
        });
    });
    
  });
});
