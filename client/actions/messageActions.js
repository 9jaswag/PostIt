import axios from 'axios';
import { SET_MESSAGE, PASS_MESSAGE } from './types';

/**
 * @description action creator to set message in store
 * @param {objec} messages - the message object
 * @returns {void}
 */
export const setMessages = messages => ({
  type: SET_MESSAGE,
  messages
});

/**
 * @function getMessages
 * @description async action creator for getting group messages
 * @param {number} id 
 * @return {promise} returns an array of messages
 */
const getMessages = id =>
  dispatch => axios.get(`/api/v1/group/${id}/messages`).then((res) => {
    dispatch(setMessages(res.data.message));
  });

export default getMessages;

/**
 * @description action creator to pass a message to store
 * @return {object} returns object and action type
 * @param {object} messageObject object containing message detail
 */
export const passMessage = messageObject => ({
  type: PASS_MESSAGE,
  messageObject
});

/**
 * @function postMessage
 * @description async action to post message in a group
 * @return {promise} returns an array with server response
 * @param {number} id
 * @param {object} messageDetails
 */
export const postMessage = (id, messageDetails) =>
  () => axios.post(`/api/v1/group/${id}/message`, messageDetails);

/**
 * @function updateReadBy
 * @description async action to update readby for a particular message
 * @return {promise} returns a promise containing server response
 * @param {string} readBy string containing updated readby information
 */
export const updateReadBy = readBy =>
  () => axios.patch('/api/v1/message/readby', readBy);
