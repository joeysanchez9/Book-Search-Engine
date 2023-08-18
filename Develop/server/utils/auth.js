const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (context) {
    const authHeader = context.req.headers.authorization;

    if (!authHeader) {
      throw new Error('You have no token!');
    }

    const token = authHeader.split(' ')[1]; // Assuming format is "Bearer <token>"

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data; // Attach user data to the context for later use
    } catch {
      throw new Error('Invalid token');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
