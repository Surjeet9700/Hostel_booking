// models/hostel.js
const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  price: Number,
  rating: Number,
  reviews: Number,
  type: String,
  beds: Number,
  location: String,
  host: String,
  hostImage: String,
  bathrooms: Number,
  guests: Number,
  description: String,
  amenities: [String],
  images: [String]
});

module.exports = mongoose.model('Hostel', hostelSchema);