const axios = require('axios');

exports.createRide = async (req, res) => {
  try {
    // Geocode addresses
    const fromCoords = await geocodeAddress(req.body.from);
    const toCoords = await geocodeAddress(req.body.to);

    const ride = new Ride({
      ...req.body,
      fromCoords,
      toCoords,
      user: req.userId
    });
    
    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function geocodeAddress(address) {
  const response = await axios.get('https://nominatim.openstreetmap.org/search', {
    params: {
      q: address,
      format: 'json',
      limit: 1
    }
  });
  
  if (response.data.length === 0) throw new Error('Address not found');
  return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
}