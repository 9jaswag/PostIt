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
        .get('/api')
        .type('form')
        .end((err, res) => {
          res.body.message.should.equals('Welcome to the Post IT API!');
          done();
        });
    });
  });
  describe('Signup API route', () => {
    it('Registers a new user when complete parameters are provided', (done) => {
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
    it('Returns 400 error and error message with no username parameter', (done) => {
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
          res.body.errors.username.should.equals('Username field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with no email parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with no password parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chuks@andela.com',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.password.should.equals('Password field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with no phone parameter', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chuks@andela.com',
          password: 'chukspass'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.phone.should.equals('Phone field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with a duplicate username', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'chuks',
          email: 'chukss@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.username.should.equals('Username already exists');
          done();
        });
    });
    it('Returns 400 error and error message with a duplicate email address', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'chuks@andela.com',
          password: 'chukspass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address already exists');
          done();
        });
    });
    it('Returns 400 error and error message with an invalid email address', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'funsho',
          email: 'funshoandela.com',
          password: 'funshopass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address is invalid');
          done();
        });
    });
    it('Returns 400 error and error message with an empty username field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: '  ',
          email: 'dave@andela.com',
          password: 'davepass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.username.should.equals('Username field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with an empty email field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: '   ',
          password: 'davepass',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.email.should.equals('Email address field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with an empty password field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'dave@andela.com',
          password: '   ',
          phone: '07033130448'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.password.should.equals('Password field cannot be empty');
          done();
        });
    });
    it('Returns 400 error and error message with an empty phone field', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .type('form')
        .send({
          username: 'dave',
          email: 'dave@andela.com',
          password: 'davepass',
          phone: '  '
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.phone.should.equals('Phone field cannot be empty');
          done();
        });
    });
  });
  describe('Signin API route', () => {
    it('Successful signin should return 200 status code', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspass',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('Successful signin should return a token', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspass',
        })
        .end((err, res) => {
          res.body.data.should.have.property('token');
          done();
        });
    });
    it('Returns error message when no username is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          password: 'chukspass',
        })
        .end((err, res) => {
          res.body.errors.username.should.equals('Username field cannot be empty');
          done();
        });
    });
    it('Returns error message when no password is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
        })
        .end((err, res) => {
          res.body.errors.password.should.equals('Password field cannot be empty');
          done();
        });
    });
    it('Returns error message when none existing username is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chukss',
          password: 'chukspass'
        })
        .end((err, res) => {
          res.body.errors.username.should.equals('User does not exist');
          done();
        });
    });
    it('Returns error message when wrong password is provided', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .type('form')
        .send({
          username: 'chuks',
          password: 'chukspasss'
        })
        .end((err, res) => {
          res.body.errors.password.should.equals('Incorrect password!');
          done();
        });
    });
  });
});
