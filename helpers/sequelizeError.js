
/**
 * A function that catches squelize errors and returns them in
 * more user friendly text
 * @function sequelizeError
 * @param {object} error - an object containing sequelize errors
 * @returns {object} - returns an object containing human readable errors
 */
const sequelizeError = (error) => {
  const errors = {};

  if (error.errors[0].message === 'Email can not be empty') {
    errors.email = 'Email field can not be empty';
  }
  if (error.errors[0].message === 'Enter a valid email address') {
    errors.email = 'Email address is invalid';
  }
  if (error.errors[0].message === 'Validation notEmpty on phone failed') {
    errors.phone = 'Phone field can not be empty';
  }
  if (error.errors[0].message === 'Phone number already exists') {
    errors.phone = 'Phone number already exists';
  }
  if (error.errors[0].message
    === 'Formatted phone number must have 13 characters') {
    errors.phone = 'Formatted phone number must have 13 characters';
  }
  if (error.errors[0].message ===
    'Only numeric characters are allowed as phone numbers') {
    errors.phone = 'Only numeric characters are allowed as phone numbers';
  }

  return errors;
};

export default sequelizeError;
