import chai from 'chai';
import models from '../models';
import userData from './data/userData';

const should = chai.should();

const { user } = userData;

let userId;

describe('User model', () => {
  it('should create a user', (done) => {
    models.User.create(user.demoUser3).then((newUser) => {
      newUser.username.should.equal(user.demoUser3.username);
      newUser.email.should.equal(user.demoUser3.email);
      newUser.phone.should.equal(user.demoUser3.phone);
      userId = newUser.id;
    });
    done();
  });
  it('should not create a user if username is null', (done) => {
    const user2 = user.demoUser5;
    models.User.create(user2).then().catch((error) => {
      error.errors[0].message.should.equal('username cannot be null');
    });
    done();
  });
  it('should not create a user if email is empty', (done) => {
    const user2 = user.demoUser4;
    models.User.create(user2).then().catch((error) => {
      error.errors[0].message.should.equal('Email can not be empty');
    });
    done();
  });
  it('should not create a user if phone is empty', (done) => {
    const user2 = user.demoUser6;
    models.User.create(user2).then().catch((error) => {
      error.errors[0].message.should
        .equal('Formatted phone number must have 13 characters');
    });
    done();
  });
  it('should not create a user if password is empty', (done) => {
    const user2 = user.demoUser7;
    models.User.create(user2).then().catch((error) => {
      error.errors[0].message.should
        .equal('Password length must be more than 6 characters');
    });
    done();
  });
  it('should update a user\'s password', (done) => {
    models.User.findById(userId).then((existingUser) => {
      existingUser
        .update({ password: 'passcode' })
        .then((updatedUser) => {
          updatedUser.dataValues.id.should.equal(userId);
          updatedUser.dataValues.password.should.equal('passcode');
          done();
        });
    });
  });
});

