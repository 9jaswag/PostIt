import expect from 'expect';
import { passMessage } from '../../actions/messageActions';

describe('Pass message Action', () => {
  it('should contain passMessage object', () => {
    expect(passMessage()).toBeA('object');
  });
});
