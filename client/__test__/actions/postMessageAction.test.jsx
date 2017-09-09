import expect from 'expect';
import postMessage from '../../actions/postMessageAction';

describe('Post message Action', () => {
  it('should contain postMessage function', () => {
    expect(postMessage()).toBeA('function');
  });
});
