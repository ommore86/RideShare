const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true },
  coords: { type: [Number], required: true }, // [latitude, longitude]
});

module.exports = mongoose.model('Ride', rideSchema);