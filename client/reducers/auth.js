/**
 * reducer to add flash message to store
 */

import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};


/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
};
