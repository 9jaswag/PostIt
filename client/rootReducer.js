/**
 * Store's root reducer
 */

import { combineReducers } from 'redux';
import auth from './reducers/auth';
import groupDetails from './reducers/groupId';
import message from './reducers/message';
import groups from './reducers/groups';

export default combineReducers({
  auth,
  groupDetails,
  message,
  groups
});
