/* global expect */
import groups, { groupMemberCount } from '../../reducers/groups';
import * as types from '../../actions/types';

describe('group reducer', () => {
  it('should return an initial state', () => {
    expect(groups(undefined, {})).toEqual([]);
  });
  it('should return an initial state', () => {
    expect(groupMemberCount(undefined, {})).toEqual(0);
  });
  it('should handle SET_USER_GROUPS', () => {
    const initialState = [];
    const action = {
      type: types.SET_USER_GROUPS,
      groups: [
        {
          id: 1,
          name: 'group name'
        }
      ]
    };
    const expectedAction = [{
      id: 1,
      name: 'group name'
    }];
    expect(
      groups(initialState, action)
    ).toEqual(expectedAction);
  });
  it('should handle SET_MEMBER_COUNT', () => {
    const action = {
      type: types.SET_MEMBER_COUNT,
      count: 3
    };
    const expectedAction = 3;
    expect(groupMemberCount(0, action)).toEqual(expectedAction);
  });
});
