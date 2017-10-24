import axios from 'axios';
import { GET_USER_GROUPS, SET_MEMBER_COUNT, SET_GROUP_DETAILS } from './types';

/**
 * Action to create a group
 */

/**
 * @return {promise} returns an array containing info of the created group
 * @param {object} data object containing data required to create the group
 */
const createGroup = data =>
  () => axios.post('/api/v1/group', data);

export default createGroup;

/**
 * Action to get the groups a user belongs to
 */


export const setUserGroups = groups => ({
  type: GET_USER_GROUPS,
  groups
});

export const setGroupMemberCount = count => ({
  type: SET_MEMBER_COUNT,
  count
});

/**
 * @function getGroups
 * @return {promise} returns an array of groups
 */
export const getGroups = () =>
  dispatch => axios.get('/api/v1/users/one').then((res) => {
    dispatch(setUserGroups(res.data.data));
  });

/**
 * Action to get group member count
 */

/**
 * @function getMemberCount
 * @param {number} id ID of the group
 * @return {object} returns an object containing the group member count
 */
export const getMemberCount = id =>
  dispatch => axios.get(`/api/v1/group/${id}/count`).then((res) => {
    dispatch(setGroupMemberCount(res.data.data));
  });

/**
 * Action to set group ID in store
 */


/**
 * @return {object} returns object and action type
 * @param {string} data string containing group details
 */
export const setGroupId = data => ({
  type: SET_GROUP_DETAILS,
  data
});

export const setGroupToStore = groupDetail => (dispatch) => {
  dispatch(setGroupId(groupDetail));
};

/**
 * Action for adding users to a group
 */

/**
 * @param {string} username - username to be found
 * @return {promise} returns an array of users info
 */
export const findUser = username =>
  () => axios.post('/api/v1/users/user', { username });


/**
 * @return {promise} returns an arraay containing info of the added user
 * @param {number} id
 * @param {number} userId 
 */
export const addUser = (id, userId) =>
  () => axios.post(`/api/v1/group/${id}/user`, userId);

/**
 * Action for removing users from a group
 */


/**
 * @return {promise} calls the api to remove a user with the user's detail
 * @param {number} id
 * @param {number} userId 
 */
export const removeUser = (id, userId) =>
  () => axios.patch(`/api/v1/group/${id}/remove`, userId);

/**
 * Action for searching for users
 */

/**
 * Search user action
 * @param {string} payload a string containing the required params
 * @return {promise} returns an array of matched users
 */
export const searchUserAction = payload =>
  () => axios.get(
    `/api/v1/user/search?username=${payload.username}&offset=${payload.offset}&limit=${payload.limit}`
  );
