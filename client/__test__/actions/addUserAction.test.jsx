import expect from 'expect';
import { addUser, findUser } from '../../actions/groupActions';

describe('Add User Action', () => {
  it('should contain addUser function', () => {
    expect(addUser()).toBeA('function');
  });
  it('should contain findUser function', () => {
    expect(findUser()).toBeA('function');
  });
});
