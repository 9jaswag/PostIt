import { ACTION_TYPE } from '../actions/types';

export default (state = '', action = {}) => {
  switch (action.type) {
    case ACTION_TYPE:
      return action.actionType;
    default: return '';
  }
};
