const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Fetch user booking history
router.get('/:userId/history', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('bookingHistory.rideId');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.bookingHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;