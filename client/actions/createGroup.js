import axios from 'axios';

/**
 * @return {promise} returns an array containing info of the created group
 * @param {object} data object containing data required to create the group
 */
const createGroup = data =>
  (dispatch) => axios.post('/api/group', data);

export default createGroup;
