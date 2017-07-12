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
    done();
  });
  describe('User sign up:', () => {
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
  });
});
