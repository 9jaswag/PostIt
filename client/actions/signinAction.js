import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utilities/setAuthToken';

const Login = userData =>
  (dispatch) => axios.post('/api/user/signin', userData).then((response) => {
    const token = response.data.data.token;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
  });

export default Login;
