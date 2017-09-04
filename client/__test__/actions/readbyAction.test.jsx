import expect from 'expect';
import updateReadBy from '../../actions/readbyAction';

describe('Message Readby Action', () => {
  it('should return a function', () => {
    expect(updateReadBy()).toBeA('function');
  });
});
