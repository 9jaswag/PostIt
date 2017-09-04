import { GET_USER_GROUPS } from '../actions/types';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_USER_GROUPS:
      return action.groups;
    default:
      return state;
  }
};
