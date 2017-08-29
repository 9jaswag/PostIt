import expect from 'expect';
import createGroup from '../../actions/createGroup';

describe('Create Group Action', () => {
  it('should return a function', () => {
    expect(createGroup()).toBeA('function');
  });
});
