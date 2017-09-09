import expect from 'expect';
import getMessages from '../../actions/getMessages';

describe('Get Messages Action', () => {
  it('should contain getMessages function', () => {
    expect(getMessages()).toBeA('function');
  });
});
