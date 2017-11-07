import { SET_SEARCHED_USERS } from '../actions/types';

/**
 * @description reducer for updating the redux with searched user
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SEARCHED_USERS:
      return action.user;
    default:
      return state;
  }
};

