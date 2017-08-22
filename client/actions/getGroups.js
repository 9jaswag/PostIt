/**
 * Action to get the groups a user belongs to
 */

import axios from 'axios';
import { GET_USER_GROUPS } from './types';

export const setUserGroups = (groups) => {
  return {
    type: GET_USER_GROUPS,
    groups
  };
};

/**
 * @return {promise} returns an array of groups
 * @param {object} data contains details of groups to be fetched
 */
const getGroups = data =>
  dispatch => axios.get('/api/users/one').then((res) => {
    dispatch(setUserGroups(res.data.data.Groups));
  });

export default getGroups;
