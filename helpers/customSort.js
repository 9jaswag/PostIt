
/**
 * @function customSort
 * @description Function for sorting the elements of an array
 * @param {object} a first object
 * @param {object} b second object
 * @return {Array} returns a sorted array
 */
const customSort = (a, b) => a.group.id - b.group.id;

export default customSort;
