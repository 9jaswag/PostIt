import expect from 'expect';
import addUser, { findUser } from '../../actions/addUserAction';

describe('Search User Action', () => {
  it('should return a function', () => {
    expect(addUser()).toBeA('function');
    expect(findUser()).toBeA('function');
  });
});
