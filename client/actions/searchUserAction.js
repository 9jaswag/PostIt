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
    `/api/user/${payload.searchTerm}/${payload.offset}/${payload.limit}/find`
  );

export default searchUserAction;
