import axios from 'axios';
import {
  ACTION_TYPE,
  SET_ERROR,
  SET_FOUND_USER,
  SET_GROUP_DETAILS,
  SET_MEMBER_COUNT,
  SET_SEARCHED_USERS,
  SET_USER_GROUPS,
  UPDATE_MEMBER_COUNT,
} from './types';

/**
 * @description action creator to set a group's details to store
 * @param {array} groupDetails array containing group details
 * @returns {object} returns object and action type
 */
export const setGroupDetail = groupDetails => ({
  type: SET_GROUP_DETAILS,
  groupDetails
});

/**
 * @description action creator to set error response to store
 * @param {any} error error response
 * @returns {object} returns object and action type
 */
export const setError = error => ({
  type: SET_ERROR,
  error
});

/**
 * @description action creator to set dispatched action type to store
 * @param {string} actionType the action type
 * @returns {object} returns object containing action type
 */
export const setAction = actionType => ({
  type: ACTION_TYPE,
  actionType
});

/**
 * @function createGroup
 * @description async action for creating a group
 * @param {object} groupDetails object containing details
 * required to create the group
 * @return {promise} returns an array containing info of the created group
 */
const createGroup = groupDetails =>
  dispatch => axios.post('/api/v1/group', groupDetails).then((res) => {
    const details = [
      res.data.data.group.id,
      res.data.data.group.name,
      res.data.data.group.owner
    ];
    dispatch(setGroupDetail(details));
    dispatch(setError({}));
  },
  ({ response }) => dispatch(setError(response.data)));

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
 * @description action creator to update a group's member count to store
 * @param {number} count - the group member count
 * @returns {void}
 */
export const updateGroupMemberCount = count => ({
  type: UPDATE_MEMBER_COUNT,
  count
});

/**
 * @function getGroups
 * @description async action to get a user's groups
 * @return {promise} returns an array of groups
 */
export const getGroups = () =>
  dispatch => axios.get('/api/v1/user/group').then((res) => {
    dispatch(setUserGroups(res.data.groups));
  },
  err => err);

/**
 * @function getMemberCount
 * @description async action to get a group's member count
 * @param {number} id ID of the group
 * @return {object} returns an object containing the group member count
 */
export const getMemberCount = id =>
  dispatch => axios.get(`/api/v1/group/${id}/count`).then((res) => {
    dispatch(setGroupMemberCount(res.data.group));
  },
  err => err);

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
 * @description action creator for setting a found user to store
 * @param {object} user object containing search response
 * @return {object} returns object and action type
 */
const setFoundUser = user => ({
  type: SET_FOUND_USER,
  user
});

/**
 * @function findUser
 * @description async action for finding a user
 * @param {string} username - username to be found
 * @return {promise} returns a user
 */
export const findUser = username =>
  dispatch => axios.post('/api/v1/user/find', { username }).then((res) => {
    dispatch(setFoundUser(res.data));
  },
  ({ response }) => {
    dispatch(setFoundUser(response.data));
  });


/**
 * @function addUser
 * @description an async action creator for adding a user to a group
 * @param {number} id - the group id
 * @param {number} userId - the user's id
 * @param {number} count - the current group member count
 * @return {promise} returns an array containing info of the added user
 */
export const addUser = (id, userId, count) =>
  dispatch => axios.post(`/api/v1/group/${id}/user`, userId).then(() => {
    dispatch(updateGroupMemberCount(count + 1));
    dispatch(setError({}));
    dispatch(setAction('ADD_USER'));
  },
  ({ response }) => dispatch(setError(response.data)));

/**
 * @function removeUser
 * @description an async action creator for removing a user from a group
 * @param {number} id - the group's id
 * @param {number} userId - the user's id
 * @param {number} count - the current group member count
 * @return {promise} calls the api to remove a user with the user's detail
 * 
 */
export const removeUser = (id, userId, count) =>
  dispatch => axios.patch(`/api/v1/group/${id}/remove`, userId).then(() => {
    dispatch(updateGroupMemberCount(count - 1));
    dispatch(setError({}));
    dispatch(setAction('REMOVE_USER'));
  },
  err => err);

/**
 * @description action creator to update search result to store
 * @param {number} user - the group member count
 * @returns {void}
 */
export const setSearchedUser = user => ({
  type: SET_SEARCHED_USERS,
  user
});

/**
 * @function searchUserAction
 * @description an async action for searching for users
 * @param {string} payload a string containing the required params
 * @return {promise} returns an array of matched users
 */
export const searchUserAction = payload =>
  dispatch => axios.get(
    `/api/v1/user/search?username=${
      payload.username}&offset=${payload.offset}&limit=${payload.limit}`
  ).then((res) => {
    dispatch(setSearchedUser(res.data));
  },
  ({ response }) => {
    dispatch(setSearchedUser(response.data));
  });
