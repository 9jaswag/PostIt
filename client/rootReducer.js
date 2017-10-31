/**
 * Store's root reducer
 */

import { combineReducers } from 'redux';
import auth from './reducers/auth';
import groupDetails from './reducers/groupDetails';
import message from './reducers/message';
import groups, { groupMemberCount } from './reducers/groups';

const appReducer = combineReducers({
  auth,
  groupDetails,
  message,
  groups,
  groupMemberCount
});

export default (state, action) => {
  if (action.type === 'SET_CURRENT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};
