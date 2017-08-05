import axios from 'axios';

const searchUserAction = (searchTerm) =>
  (dispatch) => axios.get(`/api/user/${searchTerm}/find`);

export default searchUserAction;
