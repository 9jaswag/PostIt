import axios from 'axios';

/**
 * @function setAuthToken
 * @description Function for setting auth token in header
 * @param {string} token
 * @return {void}
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};
export default setAuthToken;
