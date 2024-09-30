// backend/routes/employee.js

const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.get('/me', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).select('-password');
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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

// @route   POST /api/employees/login
// @desc    Authenticate employee and get token
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if employee exists
    const employee = await Employee.findOne({ username });

    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      employee: {
        id: employee._id,
        username: employee.username,
        employeeId: employee.employeeId,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
