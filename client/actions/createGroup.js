import axios from 'axios';

/**
 * @return {promise} returns an array containing info of the created group
 * @param {object} data object containing data required to create the group
 */
const createGroup = data =>
  () => axios.post('/api/v1/group', data);

export default createGroup;
