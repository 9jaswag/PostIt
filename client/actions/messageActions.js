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
 * @param {object} messageObject object containing message detail
 */
export const passMessage = messageObject => ({
  type: PASS_MESSAGE,
  messageObject
});

/**
 * action to post message in a group
 */


/**
 * @return {promise} returns an array with server response
 * @param {number} id
 * @param {object} messageDetails
 */
export const postMessage = (id, messageDetails) =>
  () => axios.post(`/api/v1/group/${id}/message`, messageDetails);

/**
 * Action to update readby for a particular message
 */


/**
 * @return {promise} returns a promise containing server response
 * @param {string} readBy string contreadByining updated readby information
 */
export const updateReadBy = readBy =>
  () => axios.patch('/api/v1/message/readby', readBy);
