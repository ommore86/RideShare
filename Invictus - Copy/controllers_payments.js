const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: ride.totalFare * 100, // Convert to cents
      currency: 'inr',
      metadata: { rideId: ride._id.toString() }
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// payments.js
async function handlePayment(rideId) {
  const { clientSecret } = await (await fetch(`/api/payments/${rideId}`)).json();
  
  const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);
  const { error } = await stripe.confirmCardPayment(clientSecret);
  
  if (error) {
    alert('Payment failed');
  } else {
    window.location.href = '/confirmation.html';
  }
}