/**
 * Action to get the messages belonging to a group
 */

import axios from 'axios';
import { SET_MESSAGE } from './types';

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
