const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ride = require('../models/Ride');

router.post('/create-payment-intent/:rideId', async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.rideId);
        
        // Calculate user's share (same logic as frontend)
        const userShare = ride.totalFare / (ride.passengers.length + 1);
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: userShare * 100, // Convert to cents
            currency: 'inr',
            metadata: { rideId: ride._id.toString() }
        });
        
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});