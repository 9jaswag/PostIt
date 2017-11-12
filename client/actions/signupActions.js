import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utilities/setAuthToken';
import { SET_CURRENT_USER, AUTH_ERROR } from './types';


/**
 * @description action creator that sets current user to store
 * @return {object} returns object containing user's detail and action type
 * @param {object} user object of currently logged in user
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
  action: 'signup'
});

/**
 * @description action creator that sets auth errors to store
 * @return {object} returns object containing user's detail and action type
 * @param {object} error error response
 */
export const setAuthError = error => ({
  type: AUTH_ERROR,
  error
});

/**
 * @function userSignupRequest
 * @description async action to handle user signup
 * @return {promise} returns server response
 * @param {object} userData object containing data submitted by user
 */
const userSignupRequest = userData =>
  dispatch => axios.post('/api/v1/user/signup', userData).then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  },
  ({ response }) => dispatch(setAuthError(response.data)));

export default userSignupRequest;
