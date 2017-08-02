import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utilities/setAuthToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

const userSignupRequest = userData =>
  (dispatch) => axios.post('/api/user/signup', userData).then(response => {
    const token = response.data.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });

export default userSignupRequest;
