import axios from 'axios';

const createGroup = data =>
  (dispatch) => axios.post('/api/group', data);

export default createGroup;
