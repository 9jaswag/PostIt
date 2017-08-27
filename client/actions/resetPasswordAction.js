/**
 * Action to reset user's password
 */

import axios from 'axios';

/**
 * @return {promise} returns a promise containing server response
 * @param {string} data string containing updated readby information
 */
const resetPassword = data =>
  dispatch => axios.patch('/api/user/reset', data);

export default resetPassword;
