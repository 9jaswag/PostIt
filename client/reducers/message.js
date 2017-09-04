/**
 * reducer to pass message to store
 */

import { PASS_MESSAGE } from '../actions/types';

/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 */
export default (state = {}, action = {}) => {
  switch (action.type) {
    case PASS_MESSAGE:
      return {
        message: action.data
      };
    default: return state;
  }
};
