import expect from 'expect';
import { SET_GROUP_DETAILS } from '../../actions/types';
import setGroupId, { setGroupToStore } from '../../actions/groupIdAction';

describe('set group id action creator', () => {
  it('should contain setGroupId object', () => {
    expect(setGroupId()).toBeA('object');
  });
  it('should create an action to to set group ID', () => {
    const groupId = 5;
    const expectedAction = {
      type: SET_GROUP_DETAILS,
      data: groupId
    };
    expect(setGroupId(groupId)).toEqual(expectedAction);
  });
  it('should contain setGroupToStore function', () => {
    expect(setGroupToStore()).toBeA('function');
  });
});
