/**
 * Action for adding users to a group
 */

import axios from 'axios';

export const findUser = () =>
  dispatch => axios.get('/api/users');

const addUser = (id, userId) =>
  (dispatch) => axios.post(`/api/group/${id}/user`, userId);

export default addUser;
