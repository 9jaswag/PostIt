
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utilities/setAuthToken';
import { SET_CURRENT_USER } from './types';

/**
 * @description action creator that sets the current user to store
 * @return {object} returns object containing user's detail and action type
 * @param {object} user object of currently logged in user
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * @function logout
 * @description action to log  out a user
 * @return {void}
 */
export const logout = () => dispatch =>
  new Promise((resolve) => {
    localStorage.removeItem('jwtToken');
    sessionStorage.clear();
    setAuthToken(false);
    resolve(dispatch(setCurrentUser({})));
  });

/**
 * @function Login
 * @description async action to log in a user
 * @return {promise} returns server response
 * @param {object} userData object containing user data to be logged in
 */
const Login = userData =>
  dispatch => axios.post('/api/v1/user/signin', userData).then((response) => {
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });

export default Login;
