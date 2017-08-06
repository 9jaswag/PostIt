import axios from 'axios';

const updateReadBy = data =>
  dispatch => axios.patch('/api/message/readby', data);

export default updateReadBy;
