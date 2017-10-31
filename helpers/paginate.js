
/**
 * @function paginate
 * @description function for getting pagination data
 * @param {number} count total number of records matching the search query
 * @param {number} limit maximum number of records to be returned for each page
 * @param {number} offset number of records before beginning to return rows
 * @returns {Object} pagination data
 */
// export default function paginate(count, limit, offset) {
//   const currentPage = Math.floor(offset / limit) + 1;
//   const numberOfPages = Math.ceil(count / limit);
//   const pageSize = (count - offset) > limit ? limit : (count - offset);

//   return {
//     totalRows: count,
//     numberOfPages,
//     currentPage,
//     pageSize,
//   };
// }

const paginate = (count, limit, offset) => {
  const numberOfPages = Math.ceil(count / limit);
  return {
    count,
    numberOfPages
  };
};

export default paginate;

