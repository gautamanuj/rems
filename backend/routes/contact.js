// backend/routes/contact.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   GET /api/contact
// @desc    Get contact details
// @access  Public
router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne();

    // If no contact details exist, create default ones
    if (!contact) {
      contact = new Contact();
      await contact.save();
    }

    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/contact
// @desc    Update contact details
// @access  Private (Requires Authentication)
// Note: Implement authentication middleware as needed
router.put('/', /* authMiddleware, */ async (req, res) => {
  const { companyName, address, phone, email, website } = req.body;

  try {
    let contact = await Contact.findOne();

    if (!contact) {
      // If no contact exists, create one
      contact = new Contact({
        companyName,
        address,
        phone,
        email,
        website,
      });
    } else {
      // Update existing contact details
      contact.companyName = companyName || contact.companyName;
      contact.address = address || contact.address;
      contact.phone = phone || contact.phone;
      contact.email = email || contact.email;
      contact.website = website || contact.website;
    }

    await contact.save();
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact details:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
