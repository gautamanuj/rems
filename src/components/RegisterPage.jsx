// src/components/RegistrationPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; // Import the CSS file for styling
import logo from '../assets/logo.png'; // Import the logo image
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  // State variables for form fields
  const [employeeData, setEmployeeData] = useState({
    employeeId: '', // Employee ID
    username: '',    // Username
    password: '',    // Password
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    address: '',
    joiningDate: '',
    salary: '',
    department: '',
  });

  // State variable for error messages
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to registration endpoint
      const response = await axios.post('http://localhost:5000/api/employees/register', employeeData);

      // Handle successful registration
      console.log('Employee registered:', response.data);
      // Redirect to the login page
      navigate('/');
    } catch (error) {
      // Handle errors
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <div className="registration-page">
      {/* Background image and overlay are set via CSS */}
      <div className="background-overlay">
        {/* Header with Logo */}
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Company Logo" className="logo" />
          </div>
        </header>

        {/* Company Name at Top Center */}
        <div className="company-name-container">
          <h1 className="company-name">ROSTERS EMS</h1>
        </div>

        {/* Registration Form */}
        <div className="registration-container">
          <form className="registration-form" onSubmit={handleSubmit}>
            <h2>Employee Registration</h2>
            {error && <div className="error">{error}</div>}
            {/* Employee ID */}
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={employeeData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
            {/* Username */}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={employeeData.username}
                onChange={handleChange}
                required
              />
            </div>
            {/* Password */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={employeeData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* First Name */}
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            {/* Last Name */}
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={employeeData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            {/* Mobile Number */}
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={employeeData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email ID */}
            <div className="form-group">
              <label>Email ID</label>
              <input
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address */}
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={employeeData.address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Joining Date */}
            <div className="form-group">
              <label>Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={employeeData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>
            {/* Salary */}
            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={employeeData.salary}
                onChange={handleChange}
                required
              />
            </div>
            {/* Department */}
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={employeeData.department}
                onChange={handleChange}
                required
              />
            </div>
            {/* Submit Button */}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
