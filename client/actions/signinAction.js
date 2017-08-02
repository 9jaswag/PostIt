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

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    location.href="/";
  };
}

const Login = userData =>
  (dispatch) => axios.post('/api/user/signin', userData).then((response) => {
    const token = response.data.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });

export default Login;
