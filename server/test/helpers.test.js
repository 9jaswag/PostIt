import chai from 'chai';
import app from '../app';
import customSort from '../../helpers/customSort';
import sequelizeError from '../../helpers/sequelizeError';

process.env.NODE_ENV = 'test';
const should = chai.should();

describe('Helper functions  test', () => {
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
  describe('customSort helper function', () => {
    it('should be a function', (done) => {
      customSort.should.be.a('function');
      done();
    });
    it('should return an array sorted by ID', (done) => {
      const array = [
        {
          group: {
            id: 13,
            name: 'Andela',
            description: 'an Andelan group'
          },
          unreadCount: 1
        },
        {
          group: {
            id: 2,
            name: 'PostIT',
            description: "A group for HNG's Factory product"
          },
          unreadCount: 4
        }
      ];
      const sortedArr = array.sort(customSort);
      sortedArr[0].group.id.should.equal(2);
      done();
    });
    describe('sequelizeError helper function', () => {
      it('should be a function', (done) => {
        sequelizeError.should.be.a('function');
        done();
      });
      it('should return empty email validation error', () => {
        const error = {
          errors: [{
            message: 'Email can not be empty'
          }]
        };
        sequelizeError(error).email.should.equals('Email field can not be empty');
      });
      it('should return invalid email validation error', () => {
        const error = {
          errors: [{
            message: 'Enter a valid email address'
          }]
        };
        sequelizeError(error).email.should.equals('Email address is invalid');
      });
      it('should return empty phone validation error', () => {
        const error = {
          errors: [{
            message: 'Validation notEmpty on phone failed'
          }]
        };
        sequelizeError(error).phone.should.equals('Phone field can not be empty');
      });
      it('should return unique phone validation error', () => {
        const error = {
          errors: [{
            message: 'Phone number already exists'
          }]
        };
        sequelizeError(error).phone.should.equals('Phone number already exists');
      });
      it('should return phone length validation error', () => {
        const error = {
          errors: [{
            message: 'Formatted phone number must have 13 characters'
          }]
        };
        sequelizeError(error).phone.should.equals(
          'Formatted phone number must have 13 characters');
      });
      it('should return invalid phone validation error', () => {
        const error = {
          errors: [{
            message: 'Only numeric characters are allowed as phone numbers'
          }]
        };
        sequelizeError(error).phone.should.equals(
          'Only numeric characters are allowed as phone numbers');
      });
    });
  });
});
