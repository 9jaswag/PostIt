/**
 * Action to set group ID in store
 */

import { SET_GROUP_DETAILS } from './types';

/**
 * @return {object} returns object and action type
 * @param {string} data string containing group details
 */
const setGroupId = data => ({
  type: SET_GROUP_DETAILS,
  data
});

export const setGroupToStore = groupDetail => (dispatch) => {
  dispatch(setGroupId(groupDetail));
};

export default setGroupId;
