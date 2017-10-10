import expect from 'expect';
import { removeUser } from '../../actions/groupActions';

describe('Remove User Action', () => {
  it('should return a function', () => {
    expect(removeUser()).toBeA('function');
  });
});
