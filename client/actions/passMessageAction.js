/**
 * action to pass a message to store
 */

import { PASS_MESSAGE } from './types';

/**
 * @return {object} returns object and action type
 * @param {object} data object containing message detail
 */
const passMessage = (data) => {
  return {
    type: PASS_MESSAGE,
    data
  };
};

export default passMessage;
