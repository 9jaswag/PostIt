import expect from 'expect';
import resetPassword from '../../actions/resetPasswordAction';

describe('Search User Action', () => {
  it('should return a function', () => {
    expect(resetPassword()).toBeA('function');
  });
});
