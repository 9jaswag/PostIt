
/**
 * @function paginate
 * @description function for getting pagination data
 * @param {number} count total number of records matching the search query
 * @param {number} limit maximum number of records to be returned for each page
 * @param {number} offset number of records before beginning to return rows
 * @returns {Object} pagination data
 */
const paginate = (count, limit, offset) => {
  const numberOfPages = Math.ceil(count / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  const usersDisplayed = (count - offset) > limit ? parseInt(
    limit, 10) : parseInt(count - offset, 10);
  return {
    count,
    numberOfPages,
    currentPage,
    usersDisplayed,
    usersPerPage: parseInt(limit, 10)
  };
};

export default paginate;

