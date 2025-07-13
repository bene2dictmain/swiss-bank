// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update balance
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;


    const user = await User.findById(
      userId
    );

    console.log(user);

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

// Update balance
router.put("/:id/balance", async (req, res) => {
  try {
    const userId = req.params.id;
    const { newBalance } = req.body;

    console.log(newBalance);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { availableBalance: newBalance },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
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
