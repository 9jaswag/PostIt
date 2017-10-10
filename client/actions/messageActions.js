/**
 * Action to get the messages belonging to a group
 */

import axios from 'axios';
import { SET_MESSAGE, PASS_MESSAGE } from './types';

export const setMessages = messages => ({
  type: SET_MESSAGE,
  messages
});

/**
 * @function getMessages
 * @param {number} id 
 * @return {promise} returns an array of messages
 */
const getMessages = id =>
  dispatch => axios.get(`/api/v1/group/${id}/messages`).then((res) => {
    dispatch(setMessages(res.data.data));
  });

export default getMessages;

/**
 * action to pass a message to store
 */


/**
 * @return {object} returns object and action type
 * @param {object} data object containing message detail
 */
export const passMessage = data => ({
  type: PASS_MESSAGE,
  data
});

/**
 * action to post message in a group
 */


/**
 * @return {promise} returns an array with server response
 * @param {number} id
 * @param {object} data
 */
export const postMessage = (id, data) =>
  () => axios.post(`/api/v1/group/${id}/message`, data);

/**
 * Action to update readby for a particular message
 */


/**
 * @return {promise} returns a promise containing server response
 * @param {string} data string containing updated readby information
 */
export const updateReadBy = data =>
  () => axios.patch('/api/v1/message/readby', data);
