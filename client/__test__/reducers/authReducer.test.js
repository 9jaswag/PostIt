import expect from 'expect';
import auth from '../../reducers/auth';
import mockData from '../../__mocks__/mockData';

describe('auth reducer', () => {
  const { reducer } = mockData;
  it('should return an initial state', () => {
    expect(auth(undefined, {})).toEqual(reducer.authInitialState);
  });
  it('should handle SET_CURRENT_USER', () => {
    const initialState = reducer.authInitialState;
    const action = reducer.setCurrentUser;
    const expectedAction = reducer.setCurrentUserAction;
    expect(auth(initialState, action)).toEqual(expectedAction);
  });
});

