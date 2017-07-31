import axios from 'axios';

const Login = userData =>
  (dispatch) => axios.post('/api/user/signin', userData);

export default Login;
