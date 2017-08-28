import expect from 'expect';
import { SET_GROUP_DETAILS } from '../../actions/types';
import setGroupId from '../../actions/groupIdAction';

describe('set group id action creator', () => {
  it('should create an action to to set group ID', () => {
    const groupId = 5;
    const expectedAction = {
      type: SET_GROUP_DETAILS,
      groupId
    };
    expect(setGroupId(groupId)).toEqual(expectedAction);
  });
});
