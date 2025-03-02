const Ride = require('./models/Ride');
const mongoose = require('mongoose');
require('dotenv').config();

const rides = [
  {
    from: 'Mumbai Central Station',
    to: 'Andheri West',
    time: '08:30 AM',
    price: 150,
    seats: 2,
    coords: [19.0657, 72.8684],
  },
  {
    from: 'Churchgate Station',
    to: 'Bandra Kurla Complex',
    time: '09:15 AM',
    price: 180,
    seats: 3,
    coords: [19.0760, 72.8777],
  },
];

const seedDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Ride.deleteMany({}); // Clear existing rides
  await Ride.insertMany(rides); // Insert new rides
  console.log('Database seeded!');
  mongoose.connection.close(); // Close the connection
};

seedDB();