// Message controller test

import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import userData from './data/userData';
import messageData from './data/messageData';

process.env.NODE_ENV = 'test';
const should = chai.should();
chai.use(chaiHttp);
let token;

describe('Message controller test', () => {
  const { user } = userData;
  const { message } = messageData;
  before((done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .type('form')
      .send({
        username: user.username,
        password: user.password
      })
      .end((err, res) => {
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });
  describe('API route for updating message readby', () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(app)
        .patch('/api/v1/message/readby')
        .type('form')
        .send({
          id: user.id,
          readby: user.username
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
          id: user.nonExistingId,
          readby: user.username
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
          id: user.thirdId,
          readby: user.username
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
          id: message.id,
          readby: 'deji'
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
