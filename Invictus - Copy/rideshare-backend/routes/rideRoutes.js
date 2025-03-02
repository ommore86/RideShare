const express = require('express');
const Ride = require('../models/Ride');
const router = express.Router();

// Fetch all available rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book a ride
router.post('/book', async (req, res) => {
  const { rideId, userId } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride || ride.seats <= 0) {
      return res.status(400).json({ message: 'Ride not available' });
    }

    // Update seats and add to user's booking history
    ride.seats -= 1;
    await ride.save();

    const User = require('../models/User');
    const user = await User.findById(userId);
    if (user) {
      user.bookingHistory.push({ rideId });
      await user.save();
      res.json({ message: 'Ride booked successfully!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;