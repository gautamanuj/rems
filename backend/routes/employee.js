// backend/routes/employee.js

const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

console.log('Employee routes are being registered');

// @route   POST /api/employees/register
// @desc    Register a new employee
// @access  Public
router.post('/register', async (req, res) => {
  const {
    employeeId,
    username,
    password,
    firstName,
    lastName,
    mobileNumber,
    email,
    address,
    joiningDate,
    salary,
    department,
  } = req.body;

  try {
    // Check if employee already exists
    let existingEmployee = await Employee.findOne({
      $or: [{ employeeId }, { username }, { email }, { mobileNumber }],
    });

    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new employee
    const newEmployee = new Employee({
      employeeId,
      username,
      password: hashedPassword,
      firstName,
      lastName,
      mobileNumber,
      email,
      address,
      joiningDate,
      salary,
      department,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({
      message: 'Employee registered successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Error registering employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
