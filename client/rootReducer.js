import { combineReducers } from 'redux';
import auth from './reducers/auth';
import groupDetails from './reducers/groupDetails';
import message from './reducers/message';
import groups, { groupMemberCount } from './reducers/groups';
import foundUser from './reducers/foundUser';
import searchUser from './reducers/searchUser';
import error from './reducers/error';
import actionType from './reducers/actionType';

const appReducer = combineReducers({
  auth,
  groupDetails,
  message,
  groups,
  groupMemberCount,
  foundUser,
  searchUser,
  error,
  actionType
});

export default (state, action) => {
  if (action.type === 'SET_CURRENT_USER') {
    state = undefined;
  }
  return appReducer(state, action);
};
