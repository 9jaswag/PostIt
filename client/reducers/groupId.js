import { SET_GROUP_DETAILS } from '../actions/types';

const initialState = {
  details: ''
};
export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_GROUP_DETAILS:
      return {
        details: action.data
      };
    default: return state;
  }
};
