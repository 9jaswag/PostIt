/**
 * Action for removing users from a group
 */
import axios from 'axios';


/**
 * @return {promise} calls the api to remove a user with the user's detail
 * @param {number} id
 * @param {number} userId 
 */
const removeUser = (id, userId) =>
  () => axios.patch(`/api/v1/group/${id}/remove`, userId);

export default removeUser;
