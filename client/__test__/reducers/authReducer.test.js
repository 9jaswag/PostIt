/* global expect */
import auth from '../../reducers/auth';
import * as types from '../../actions/types';

describe('auth reducer', () => {
  it('should return an initial state', () => {
    expect(auth(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
  it('should handle SET_CURRENT_USER', () => {
    const initialState = {
      isAuthenticated: false,
      user: {}
    };
    const action = {
      type: types.SET_CURRENT_USER,
      user: {
        userId: 1,
        userEmail: 'chuks@andela.com',
        userUsername: 'chuks'
      }
    };
    const expectedAction = {
      isAuthenticated: true,
      user: action.user
    };
    expect(
      auth(initialState, action)
    ).toEqual(expectedAction);
  });
});

