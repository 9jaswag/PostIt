import expect from 'expect';
import removeUser from '../../actions/removeUserAction';

describe('Remove User Action', () => {
  it('should return a function', () => {
    expect(removeUser()).toBeA('function');
  });
});
