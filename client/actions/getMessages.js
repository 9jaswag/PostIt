/**
 * Action to get the messages belonging to a group
 */

import axios from 'axios';

const getMessages = id =>
  (dispatch) => axios.get(`/api/group/${id}/messages`);

export default getMessages;
