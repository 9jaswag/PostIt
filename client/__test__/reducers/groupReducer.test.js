import expect from 'expect';
import groups, { groupMemberCount } from '../../reducers/groups';
import mockData from '../../__mocks__/mockData';

const { reducer } = mockData;
describe('group reducer', () => {
  it('should return an initial state', () => {
    expect(groups(undefined, {})).toEqual(reducer.emptyInitialState);
  });
  it('should handle SET_USER_GROUPS', () => {
    const action = reducer.setUserGroup;
    const expectedAction = reducer.setUserGroup.groups;
    expect(
      groups(reducer.emptyInitialState, action)
    ).toEqual(expectedAction);
  });
});

describe('groupMemberCount reducer', () => {
  it('should return an initial state', () => {
    expect(groupMemberCount(undefined, {})).toEqual(0);
  });
  it('should handle SET_MEMBER_COUNT', () => {
    const action = reducer.setMemberCount;
    const expectedAction = reducer.setMemberCount.count;
    expect(groupMemberCount(0, action)).toEqual(expectedAction);
  });
});
