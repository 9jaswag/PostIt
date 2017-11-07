import { SET_FOUND_USER } from '../actions/types';

/**
 * @function foundUser
 * @description reducer for adding a found user to store
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case SET_FOUND_USER:
      return action.user;
    default:
      return state;
  }
};

