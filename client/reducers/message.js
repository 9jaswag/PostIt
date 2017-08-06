import { PASS_MESSAGE } from '../actions/types';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case PASS_MESSAGE:
      return {
        message: action.data
      };
    default: return state;
  }
};
