import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

// export function addFlashMessage(message){
//   return {
//     type: ADD_FLASH_MESSAGE,
//     message
//   };
// }

/**
 * @return {object} returns object and action type
 * @param {string} message 
 */
export const addFlashMessage = (message) => {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
};

// export function deleteFlashMessage(id){
//   return {
//     type:  DELETE_FLASH_MESSAGE,
//     id
//   };
// }

/**
 * @return {object} returns object and action type
 * @param {number} id 
 */
export const deleteFlashMessage = (id) => {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  };
};

