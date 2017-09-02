/**
 * action to post message in a group
 */

import axios from 'axios';

/**
 * @return {promise} returns an array with server response
 * @param {number} id 
 * @param {object} data 
 */
const postMessage = (id, data) =>
  () => axios.post(`/api/group/${id}/message`, data);

export default postMessage;
