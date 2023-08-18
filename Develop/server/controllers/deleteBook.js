const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    
    if (!req.user) {
      throw new AuthenticationError('You are not authorized to perform this action.');
    }

    // Find the user by their ID
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedBooks: bookId } },
      { new: true }
    );

    if (!user) {
      throw new AuthenticationError('User not found.');
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete book.' });
  }
};

module.exports = { deleteBook };






