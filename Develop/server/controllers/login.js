const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const correctPassword = await user.isCorrectPassword(password);

    if (!correctPassword) {
      throw new AuthenticationError('Incorrect credentials');
    }

    // Generate a JWT token
    const token = signToken(user);

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Login failed' });
  }
};

module.exports = { login };