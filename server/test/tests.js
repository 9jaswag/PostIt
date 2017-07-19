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

describe('PostIT API Tests:', () => {
  describe('Base API', () => {
    it('Displays welcome message', (done) => {
      chai.request(app)
        .get('/')
        .type('form')
        .end((err, res) => {
          res.body.message.should.equals('Welcome to the Post IT API!');
          done();
        });
    });
  });
  describe('Register a new user', () => {
    it('Registers a new user with complete parameters', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chuks@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it('Returns 400 error with no username parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          email: 'chuks@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
