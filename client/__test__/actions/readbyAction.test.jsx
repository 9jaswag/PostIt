import expect from 'expect';
import updateReadBy from '../../actions/readbyAction';

describe('Message Readby Action', () => {
  it('should return a function that updates the readby status of a message', () => {
    expect(updateReadBy()).toBeA('function');
  });
});
