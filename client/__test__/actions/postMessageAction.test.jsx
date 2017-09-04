import expect from 'expect';
import postMessage from '../../actions/postMessageAction';

describe('Post message Action', () => {
  it('should return a function', () => {
    expect(postMessage()).toBeA('function');
  });
});
