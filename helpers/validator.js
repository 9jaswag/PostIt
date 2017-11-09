
/**
 * Function for validating user input
 * @function validator
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {string} type - the validation type
 * @returns {string} - returns a string if all input is valid
 */
const validator = (req, res, type) => {
  const errors = { };
  let hasError = false;
  if (type === 'signin') {
    if (!req.body.username || req.body.username.trim() === '') {
      hasError = true;
      errors.username = 'Username field cannot be empty';
    } if (!req.body.password || req.body.password.trim() === '') {
      hasError = true;
      errors.password = 'Password field cannot be empty';
    } else if (req.body.password.length < 6) {
      hasError = true;
      errors.password = 'Password length must be more than 6 characters';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    return 'validated';
  }

  if (type === 'signup') {
    if (!req.body.username || req.body.username.trim() === '') {
      hasError = true;
      errors.username = 'Username field cannot be empty';
    } if (!req.body.password || req.body.password.trim() === '') {
      hasError = true;
      errors.password = 'Password field cannot be empty';
    } else if (req.body.password.length < 6) {
      hasError = true;
      errors.password = 'Password length must be more than 6 characters';
    } if (!req.body.email || req.body.email.trim() === '') {
      hasError = true;
      errors.email = 'Email address field cannot be empty';
    } if (!req.body.phone || req.body.phone.trim() === '') {
      hasError = true;
      errors.phone = 'Phone field cannot be empty';
    } else if (isNaN(req.body.phone)) {
      hasError = true;
      errors.phone = 'Phone number cannot contain text';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    return 'validated';
  }

  if (type === 'requestreset') {
    if (!(req.body.email)) {
      return res.status(400).send(
        { status: false, error: 'No email address provided' });
    }
    if (!(req.body.type)) {
      return res.status(400).send(
        { status: false, error: 'Request type must be specified' }
      );
    }
    if ((req.body.type !== 'request') && (req.body.type !== 'reset')) {
      return res.status(400).send(
        { status: false, error: 'Invalid request type' });
    }
    return 'validated';
  }

  if (type === 'resetpassword') {
    if (!req.body.password) {
      return res.status(400).send(
        { status: false, error: 'Provide a new password' });
    }
    if (!req.body.token) {
      return res.status(400).send(
        { status: false, error: 'No token is provided' });
    }
    return 'validated';
  }

  if (type === 'updatereadby') {
    if (!req.body.id) {
      hasError = true;
      errors.id = 'Message ID not supplied';
    }
    if (!req.body.readby) {
      hasError = true;
      errors.readby = 'Read By not supplied';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    return 'validated';
  }

  if (type === 'creategroup') {
    if (!req.body.name || req.body.name.trim() === '') {
      hasError = true;
      errors.name = 'Please choose a group name';
    } if (!req.decoded.username) {
      hasError = true;
      errors.username = 'Please enter a group owner';
    } if (!req.body.description || req.body.description.trim() === '') {
      hasError = true;
      errors.description = 'Please enter a description of the group';
    }
    if (hasError) {
      return res.status(400).send({ success: false, errors });
    }
    return 'validated';
  }

  if (type === 'adduser') {
    if (!req.body.userId) {
      return res.status(400)
        .send({ success: false, error: { message: 'a User ID is required' } });
    } else if (!req.params.group_id
      || req.params.group_id.trim() === '' || isNaN(req.params.group_id)) {
      return res.status(400)
        .send({ success: false, message: 'a Group ID is required' });
    }
    return 'validated';
  }

  if (type === 'postmessage') {
    if (!req.body.title || req.body.title.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Message title can not be empty' } });
    } else if (!req.body.message || req.body.message.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Message can not be empty' } });
    } else if (
      !req.decoded.username || req.decoded.username.trim() === '') {
      return res.status(400).send({ success: false,
        error: { message: 'Readby cannot be empty' } });
    } else if (!req.decoded.username) {
      return res.status(400).send({ success: false,
        error: { message: 'Message must have an author' } });
    } else if (!req.decoded.id) {
      return res.status(400).send({ success: false,
        error: { message: 'Message must have a User ID' } });
    }
    return 'validated';
  }

  if (type === 'fetchmessage') {
    if (!req.params.group_id ||
      req.params.group_id.trim() === '' || isNaN(req.params.group_id)) {
      return res.status(400)
        .send({ success: false, error: 'a Group ID is required' });
    }
    return 'validated';
  }
};

export default validator;
