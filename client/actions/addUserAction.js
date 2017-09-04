/**
 * Action for adding users to a group
 */

import axios from 'axios';

/**
 * @return {promise} returns an array of users info
 * @param void
 */
export const findUser = () =>
  dispatch => axios.get('/api/users');


/**
 * @return {promise} returns an arraay containing info of the added user
 * @param {number} id
 * @param {number} userId 
 */
const addUser = (id, userId) =>
  (dispatch) => axios.post(`/api/group/${id}/user`, userId);

export default addUser;
