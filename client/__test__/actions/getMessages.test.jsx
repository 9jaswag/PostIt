import expect from 'expect';
import getMessages from '../../actions/getMessages';

describe('Get Messages Action', () => {
  it('should return a function', () => {
    expect(getMessages()).toBeA('function');
  });
});
