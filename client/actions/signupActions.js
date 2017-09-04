import axios from 'axios';
import jwt from 'jsonwebtoken';
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
 * @return {promise} returns server response
 * @param {object} userData object containing data submitted by user
 */
const userSignupRequest = userData =>
  dispatch => axios.post('/api/user/signup', userData).then((response) => {
    const token = response.data.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });

export default userSignupRequest;
