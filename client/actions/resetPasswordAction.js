/**
 * Action to reset user's password
 */

import axios from 'axios';

/**
 * @return {promise} returns a promise containing server response
 * @param {string} userData string containing updated readby information
 */
const resetPassword = userData =>
  () => axios.patch('/api/v1/user/reset', userData);

export default resetPassword;
