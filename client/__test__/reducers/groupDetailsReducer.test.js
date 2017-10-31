/* global expect */
import groupDetails from '../../reducers/groupDetails';
import * as types from '../../actions/types';

describe('group detail reducer', () => {
  const initialState = {
    details: ''
  };
  it('should return an initial state', () => {
    expect(groupDetails(undefined, {})).toEqual([]);
  });
  it('should handle SET_GROUP_DETAILS:', () => {
    const action = {
      type: types.SET_GROUP_DETAILS,
      groupDetails: [1, 'Grouppie']
    };
    const expectedAction = [1, 'Grouppie'];
    expect(
      groupDetails(initialState, action)
    ).toEqual(expectedAction);
  });
});
