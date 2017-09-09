/**
 * Action to get the groups a user belongs to
 */

import axios from 'axios';
import { GET_USER_GROUPS, SET_MEMBER_COUNT } from './types';

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
const getGroups = () =>
  dispatch => axios.get('/api/v1/users/one').then((res) => {
    dispatch(setUserGroups(res.data.data));
  });

/**
 * @function getMemberCount
 * @param {number} id ID of the group
 * @return {object} returns an object containing the group member count
 */
export const getMemberCount = id =>
  dispatch => axios.get(`/api/v1/group/${id}/count`).then((res) => {
    dispatch(setGroupMemberCount(res.data.data));
  });

export default getGroups;
