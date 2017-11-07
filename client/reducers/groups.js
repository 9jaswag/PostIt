import { SET_USER_GROUPS, SET_MEMBER_COUNT,
  UPDATE_MEMBER_COUNT } from '../actions/types';


/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_USER_GROUPS:
      return action.groups;
    default:
      return state;
  }
};

export const groupMemberCount = (state = 0, action = {}) => {
  switch (action.type) {
    case SET_MEMBER_COUNT:
      return action.count;
    case UPDATE_MEMBER_COUNT:
      return action.count;
    default:
      return state;
  }
};

