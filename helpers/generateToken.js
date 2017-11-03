import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const token = jwt
    .sign({
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone
    }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
  return token;
};

export default generateToken;
