const rideSchema = new mongoose.Schema({
  from: String,
  to: String,
  fromCoords: [Number],
  toCoords: [Number],
  totalFare: Number,
  seats: Number,
  passengers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' }
  }]
});

// Calculate individual shares
rideSchema.methods.calculateShares = function() {
  const share = this.totalFare / (this.passengers.length + 1);
  this.passengers.forEach(p => p.share = share);
};