// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password'); // exclude password field
  res.json(users);
});



// Update balance
router.put("/:id/balance", async (req, res) => {
  try {
    const userId = req.params.id;
    const { newBalance } = req.body;

    console.log(newBalance);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        availableBalance: newBalance,
        pendingBalance: newBalance
       },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

const auth = require("../middleware/authMiddleware");
// PUT /api/users/change-password
router.put('/change-password', auth, async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: 'New passwords do not match' });
  }

  try {
    const user = await User.findById(req.user.id); // assuming auth middleware sets req.user
    console.log(user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Delete user
router.delete('/:id', async (req, res) => {
    try {
 await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
    } catch (err) {
console.error(err)
    }
 
});

module.exports = router;
