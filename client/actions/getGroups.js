/**
 * Action to get the groups a user belongs to
 */

import axios from 'axios';

/**
 * @return {promise} returns an array of groups
 * @param {object} data contains details of groups to be fetched
 */
const getGroups = data =>
  (dispatch) => axios.get('/api/users/one');

export default getGroups;
