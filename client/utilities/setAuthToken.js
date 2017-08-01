import axios from 'axios';

/**
 * Function for setting auth token in header
 * @param {string} token 
 */
export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}
