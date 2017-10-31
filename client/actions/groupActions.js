import axios from 'axios';
import { SET_USER_GROUPS, SET_MEMBER_COUNT, SET_GROUP_DETAILS } from './types';


/**
 * @function createGroup
 * @description async action for creating a group
 * @param {object} groupDetails object containing details
 * required to create the group
 * @return {promise} returns an array containing info of the created group
 */
const createGroup = groupDetails =>
  () => axios.post('/api/v1/group', groupDetails);

export default createGroup;

/**
 * @description action creator for setting a user's
 * groups to store
 * @param {array} groups an array containing a user's groups
 * @returns {void}
 */
export const setUserGroups = groups => ({
  type: SET_USER_GROUPS,
  groups
});

/**
 * @description action creator to set a group's member count to store
 * @param {number} count - the group member count
 * @returns {void}
 */
export const setGroupMemberCount = count => ({
  type: SET_MEMBER_COUNT,
  count
});

/**
 * @function getGroups
 * @description async action to get a user's groups
 * @return {promise} returns an array of groups
 */
export const getGroups = () =>
  dispatch => axios.get('/api/v1/users/one').then((res) => {
    dispatch(setUserGroups(res.data.groups));
  });

/**
 * @function getMemberCount
 * @description async action to get a group's member count
 * @param {number} id ID of the group
 * @return {object} returns an object containing the group member count
 */
export const getMemberCount = id =>
  dispatch => axios.get(`/api/v1/group/${id}/count`).then((res) => {
    dispatch(setGroupMemberCount(res.data.group));
  });

/**
 * @description action creator to set a group's details to store
 * @param {array} groupDetails array containing group details
 * @return {object} returns object and action type
 */
export const setGroupDetail = groupDetails => ({
  type: SET_GROUP_DETAILS,
  groupDetails
});

/**
 * @function setGroupToStore
 * @description an action to set a group to store
 * @param {array} groupDetail an array containing a group's detail
 * @returns {void}
 */
export const setGroupToStore = groupDetail => (dispatch) => {
  dispatch(setGroupDetail(groupDetail));
};

/**
 * @function findUser
 * @description async action for finding a user
 * @param {string} username - username to be found
 * @return {promise} returns a user
 */
export const findUser = username =>
  () => axios.post('/api/v1/users/user', { username });


/**
 * @function addUser
 * @description an async action creator for adding a user to a group
 * @param {number} id
 * @param {number} userId 
 * @return {promise} returns an array containing info of the added user
 */
export const addUser = (id, userId) =>
  () => axios.post(`/api/v1/group/${id}/user`, userId);

/**
 * @function removeUser
 * @description an async action creator for removing a user from a group
 * @param {number} id - the group's id
 * @param {number} userId - the user's id
 * @return {promise} calls the api to remove a user with the user's detail
 */
export const removeUser = (id, userId) =>
  () => axios.patch(`/api/v1/group/${id}/remove`, userId);

/**
 * @function searchUserAction
 * @description an async action for searching for users
 * @param {string} payload a string containing the required params
 * @return {promise} returns an array of matched users
 */
export const searchUserAction = payload =>
  () => axios.get(
    `/api/v1/user/search?username=${payload.username}&offset=${payload.offset}&limit=${payload.limit}`
  );
