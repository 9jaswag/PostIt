/* global localStorage */
/* global sessionStorage */
/**
 * Action to handle sign in/logout
 */

import axios from 'axios';
import jwt from 'jsonwebtoken';
// import { withRouter } from 'react-router-dom';
import setAuthToken from '../utilities/setAuthToken';
import { SET_CURRENT_USER } from './types';

/**
 * @return {object} returns object containing user's detail and action type
 * @param {object} user object of currently logged in user
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * @return {void}
 */
export const logout = () => dispatch =>
  new Promise((resolve) => {
    localStorage.removeItem('jwtToken');
    sessionStorage.clear();
    setAuthToken(false);
    resolve(dispatch(setCurrentUser({})));
  })
;

/**
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
