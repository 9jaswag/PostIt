/**
 * Action for searching for users
 */

import axios from 'axios';

/**
 * @return {promise} returns an array of matched users
 * @param {string} searchTerm a string containing the search term provided by the user
 */
const searchUserAction = searchTerm =>
  () => axios.get(`/api/user/${searchTerm}/find`);

export default searchUserAction;
