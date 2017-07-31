import axios from 'axios';

const Login = userData =>
  (dispatch) => axios.post('/api/user/signin', userData).then((response) => {
    const token = response.data.data.token;
    localStorage.setItem('jwtToken', token);
  });

export default Login;
