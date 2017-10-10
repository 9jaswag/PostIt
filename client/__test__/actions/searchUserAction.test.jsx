import expect from 'expect';
import { searchUserAction } from '../../actions/groupActions';

describe('Search User Action', () => {
  it('should contain a searchUserAction function', () => {
    expect(searchUserAction()).toBeA('function');
  });
});
