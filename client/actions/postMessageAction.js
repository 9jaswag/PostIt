import axios from 'axios';

const postMessage = (id, data) =>
  (dispatch) => axios.post(`/api/group/${id}/message`, data);

export default postMessage;
