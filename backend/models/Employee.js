// backend/models/Employee.js

const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true, // Employee ID must be unique
  },
  username: {
    type: String,
    required: true,
    unique: true, // Username must be unique
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
