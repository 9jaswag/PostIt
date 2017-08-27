/**
 * Store's root reducer
 */

import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import groupDetails from './reducers/groupId';
import message from './reducers/message';
import groups from './reducers/groups';

export default combineReducers({
  flashMessages,
  auth,
  groupDetails,
  message,
  groups
});
