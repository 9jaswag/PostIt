import expect from 'expect';
import searchUserAction from '../../actions/searchUserAction';

describe('Add User Action', () => {
  it('should return a function', () => {
    expect(searchUserAction()).toBeA('function');
  });
});
