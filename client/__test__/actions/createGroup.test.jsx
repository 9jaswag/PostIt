import expect from 'expect';
import createGroup from '../../actions/createGroup';

describe('Create Group Action', () => {
  it('should contain createGroup function', () => {
    expect(createGroup()).toBeA('function');
  });
});
