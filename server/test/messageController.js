// Message controller test

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

describe('Message controller test', () => {
  before((done) => {
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
  describe('API route for updating message readby', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/message/readby')
        .type('form')
        .send({
          id: 1,
          readby: 'chuks'
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
        .patch('/api/v1/message/readby')
        .type('form')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.id.should.equal('Message ID not supplied');
          res.body.errors.readby.should.equal('Read By not supplied');
          done();
        });
    });
    it('should return an error if the message does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/message/readby')
        .type('form')
        .set('x-access-token', token)
        .send({
          id: 122,
          readby: 'chuks'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.message.should.equal('Message does not exist');
          done();
        });
    });
    it('should return an error if user has read the message', (done) => {
      chai.request(app)
        .patch('/api/v1/message/readby')
        .type('form')
        .set('x-access-token', token)
        .send({
          id: 1,
          readby: 'chuks'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.should.equal('User has read this message');
          done();
        });
    });
    it('should update the message readby', (done) => {
      chai.request(app)
        .patch('/api/v1/message/readby')
        .type('form')
        .set('x-access-token', token)
        .send({
          id: 1,
          readby: 'deji'
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
