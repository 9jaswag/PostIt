import axios from 'axios';

const userSignupRequest = userData =>
  (dispatch) => axios.post('/api/user/signup', userData);

export default userSignupRequest;
