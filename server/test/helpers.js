// helper functions test

// import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import customSort from '../../helpers/customSort';

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
  });
});
