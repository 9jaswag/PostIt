import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import groupDetails from './reducers/groupId';

export default combineReducers({
  flashMessages,
  auth,
  groupDetails
});
