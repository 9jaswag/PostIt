/**
 * Action for searching for users
 */

import axios from 'axios';

/**
 * Search user action
 * @param {string} payload a string containing the required params
 * @return {promise} returns an array of matched users
 */
const searchUserAction = payload =>
  () => axios.get(
    `/api/v1/user/search?username=${payload.username}&offset=${payload.offset}&limit=${payload.limit}`
  );

export default searchUserAction;
