/**
 * User controller
 * handles every user related task
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export default {
  
};
