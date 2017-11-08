import { SET_GROUP_DETAILS } from '../actions/types';

/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_GROUP_DETAILS:
      return action.groupDetails;
    default: return state;
  }
};
