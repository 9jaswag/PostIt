/**
 * reducer to set group detail in store
 */

import { SET_GROUP_DETAILS } from '../actions/types';

const initialState = {
  details: ''
};

/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_GROUP_DETAILS:
      return {
        details: action.data
      };
    default: return state;
  }
};
