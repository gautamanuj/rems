// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employee'); // Existing routes
const contactRoutes = require('./routes/contact'); // Newly added
require('dotenv').config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {console.log('Connected to MongoDB Atlas');})
  .catch((error) => {console.error('Error connecting to MongoDB Atlas:', error);});

// Import Routes
const authRoutes = require('./routes/auth');


// Use API Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes); // Mount employee routes
app.use('/api/contact', contactRoutes); // Register the contact routes



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
