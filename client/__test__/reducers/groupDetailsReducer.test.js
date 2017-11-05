import expect from 'expect';
import groupDetails from '../../reducers/groupDetails';
import mockData from '../../__mocks__/mockData';

describe('group detail reducer', () => {
  const { reducer } = mockData;
  const initialState = reducer.groupDetailInitialState;
  it('should return an initial state', () => {
    expect(groupDetails(undefined, {})).toEqual([]);
  });
  it('should handle SET_GROUP_DETAILS:', () => {
    const action = reducer.setGroupDetail;
    const expectedAction = reducer.setGroupDetailAction;
    expect(groupDetails(initialState, action)).toEqual(expectedAction);
  });
});
