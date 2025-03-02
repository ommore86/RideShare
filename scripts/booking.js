document.addEventListener('DOMContentLoaded', async () => {
    // Get ride ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const rideId = urlParams.get('rideId');
    
    // Fetch ride details
    const ride = await fetchRideDetails(rideId);
    
    // Display ride info
    document.getElementById('rideRoute').textContent = `${ride.from} → ${ride.to}`;
    document.getElementById('rideTime').textContent = `🕒 ${new Date(ride.time).toLocaleTimeString()}`;
    document.getElementById('rideFare').textContent = `💰 Total Fare: ₹${ride.totalFare}`;
    
    // Calculate user's share (example: equal split with driver)
    const userShare = ride.totalFare / (ride.passengers.length + 1);
    document.getElementById('userShare').textContent = `🧾 Your Share: ₹${userShare.toFixed(2)}`;
    document.getElementById('amount').textContent = userShare.toFixed(2);

    // Initialize Stripe
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#cardElement');
});

async function fetchRideDetails(rideId) {
    try {
        const response = await fetch(`/api/rides/${rideId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching ride:', error);
        alert('Failed to load ride details');
    }
}

async function handlePayment() {
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
    const rideId = new URLSearchParams(window.location.search).get('rideId');
    
    // Create payment intent
    const { clientSecret } = await fetch(`/api/payments/create-payment-intent/${rideId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json());

    // Confirm payment
    const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
        }
    });

    if (error) {
        document.getElementById('paymentStatus').innerHTML = `
            <p class="error">❌ Payment failed: ${error.message}</p>
        `;
    } else {
        window.location.href = `/confirmation.html?rideId=${rideId}`;
    }
}


routes/payments.js