
/**
 * @function paginate
 * @description function for getting pagination data
 * @param {number} count total number of records matching the search query
 * @param {number} limit maximum number of records to be returned for each page
 * @returns {Object} pagination data
 */
const paginate = (count, limit) => {
  const numberOfPages = Math.ceil(count / limit);
  return {
    count,
    numberOfPages
  };
};

export default paginate;

