/**
 * Action to get the messages belonging to a group
 */

import axios from 'axios';

/**
 * @function getMessages
 * @param {number} id 
 * @return {promise} returns an array of messages
 */
const getMessages = id =>
  () => axios.get(`/api/group/${id}/messages`);

export default getMessages;
