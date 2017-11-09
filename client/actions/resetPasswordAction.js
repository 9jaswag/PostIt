import axios from 'axios';

/**
 * @function resetPassword
 * @description async action to reset user's password
 * @return {promise} returns a promise containing server response
 * @param {string} userData string containing the user's information
 */
const resetPassword = userData =>
  () => axios.patch('/api/v1/user/reset', userData);

export default resetPassword;
