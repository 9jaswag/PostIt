import { SET_GROUP_ID } from '../actions/types';
const initialState = {
  groupId: null
};
export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_GROUP_ID:
      return {
        groupId: action.id
      };
    default: return state;
  }
}