// backend/models/Contact.js

const mongoose = require('mongoose');

// Define the Contact Schema
const ContactSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: 'ROSTERS EMS',
  },
  address: {
    type: String,
    required: true,
    default: '40 Barber Avenue, Penrith 2750, NSW, Australia',
  },
  phone: {
    type: String,
    required: true,
    default: '+1 (234) 567-8900',
  },
  email: {
    type: String,
    required: true,
    default: 'contact@rostersems.com',
  },
  website: {
    type: String,
    required: false,
    default: 'https://www.rostersems.com',
  },
  // Add more fields as necessary
}, { timestamps: true });

// Export the Contact model
module.exports = mongoose.model('Contact', ContactSchema);
