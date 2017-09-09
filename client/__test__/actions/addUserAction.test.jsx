import expect from 'expect';
import addUser, { findUser } from '../../actions/addUserAction';

describe('Add User Action', () => {
  it('should contain addUser function', () => {
    expect(addUser()).toBeA('function');
  });
  it('should contain findUser function', () => {
    expect(findUser()).toBeA('function');
  });
});
