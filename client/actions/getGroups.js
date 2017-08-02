import axios from 'axios';

const getGroups = data =>
  (dispatch) => axios.get('/api/users/one');

export default getGroups;
