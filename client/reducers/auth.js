import isEmpty from 'lodash/isEmpty';
import initialState from '../state';
import { SET_CURRENT_USER } from '../actions/types';


/**
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 * @return {object} state - the new state of the store is returned
 */
export default (state = initialState, action = {}) => {
  const auth = {
    isAuthenticated: !isEmpty(action.user),
    user: action.user
  };
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, auth);
    default: return state;
  }
};
