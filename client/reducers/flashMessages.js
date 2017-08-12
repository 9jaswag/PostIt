/**
 * reducer to handle adding and deleting flash message
 */

import shortid from 'shortid';
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import findIndex from 'lodash/findIndex';


/**
 * @return {object} returns app's new state
 * @param {object} state object containing initial state
 * @param {object} action object containing action to be carried out
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }
      return state;
    default: return state;
  }
};

