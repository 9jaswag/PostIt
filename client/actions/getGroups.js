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
 * @function getGroups
 * @return {promise} returns an array of groups
 */
const getGroups = () =>
  dispatch => axios.get('/api/v1/users/one').then((res) => {
    dispatch(setUserGroups(res.data.data));
  });

export default getGroups;
