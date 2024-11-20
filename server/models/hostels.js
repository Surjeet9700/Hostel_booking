// models/hostel.js
const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({   
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  type: { type: String, required: true },
  beds: { type: Number, required: true },
  location: { type: String, required: true },
  host: { type: String, required: true },
  hostImage: { type: String, required: true },
  bathrooms: { type: Number, default: 1 },
  guests: { type: Number, default: 2 },
  description: { type: String, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] }
});


module.exports = mongoose.model('Hostel', hostelSchema, 'hostels');