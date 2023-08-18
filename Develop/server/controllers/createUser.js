const { User } = require('../models');
const { signToken } = require('../utils/auth');

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create a new user
    const user = await User.create({ username, email, password });
    
    // Sign a token for the new user
    const token = signToken(user);
    
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

module.exports = { createUser };