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
        id: 1,
        email: 'chuks@andela.com',
        username: 'chuks'
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

