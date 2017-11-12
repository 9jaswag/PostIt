import axios from 'axios';
import { SET_MESSAGE, UPDATE_GROUP_MESSAGE } from './types';
import { setAction, setError } from './groupActions';

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
    dispatch(setError({}));
    dispatch(setAction('GET_MESSAGE'));
  },
  ({ response }) => dispatch(setError(response.data)));

export default getMessages;

/**
 * @description action creator to update group message in store
 * @param {objec} message - the message object
 * @returns {void}
 */
export const updateGroupMessages = message => ({
  type: UPDATE_GROUP_MESSAGE,
  message
});

/**
 * @function postMessage
 * @description async action to post message in a group
 * @return {promise} returns an array with server response
 * @param {number} id
 * @param {object} messageDetails
 */
export const postMessage = (id, messageDetails) =>
  dispatch => axios.post(`/api/v1/group/${id}/message`, messageDetails)
    .then((res) => {
      dispatch(updateGroupMessages(res.data.data.message));
      dispatch(setError({}));
    },
    ({ response }) => dispatch(setError(response.data)));

/**
 * @function updateReadBy
 * @description async action to update readby for a particular message
 * @return {promise} returns a promise containing server response
 * @param {string} readBy string containing updated readby information
 */
export const updateReadBy = readBy =>
  () => axios.patch('/api/v1/message/readby', readBy);
