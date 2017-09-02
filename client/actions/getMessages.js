/**
 * Action to get the messages belonging to a group
 */

import axios from 'axios';

/**
 * @return {promise} returns an array of messages
 * @param {number} id 
 */
const getMessages = id =>
  () => axios.get(`/api/group/${id}/messages`);

export default getMessages;
