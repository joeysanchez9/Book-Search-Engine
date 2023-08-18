const { User } = require('../models');

const saveBook = async (req, res) => {
  try {
    const { user } = req;
    const { input } = req.body; // Assuming the input contains book details
    
    // Find the user by their authentication context
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { savedBooks: input } },
      { new: true }
    ).populate('savedBooks');
    
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save book' });
  }
};

module.exports = { saveBook };