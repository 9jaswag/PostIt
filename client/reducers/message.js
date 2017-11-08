import { SET_MESSAGE, UPDATE_GROUP_MESSAGE } from '../actions/types';

/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_MESSAGE:
      return action.messages;
    case UPDATE_GROUP_MESSAGE:
      return [action.message, ...state];
    default: return state;
  }
};
