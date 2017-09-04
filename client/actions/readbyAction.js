/**
 * Action to update readby for a particular message
 */

import axios from 'axios';

/**
 * @return {promise} returns a promise containing server response
 * @param {string} data string containing updated readby information
 */
const updateReadBy = data =>
  () => axios.patch('/api/message/readby', data);

export default updateReadBy;
