import { GET_USER_GROUPS } from '../actions/types';


/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_USER_GROUPS:
      return action.groups;
    default:
      return state;
  }
};
