// src/components/LoginPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Import the CSS file
import logo from '../assets/logo.png'; // Import the logo image
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // Define formData and setFormData
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to login endpoint
      const response = await axios.post('http://localhost:5000/api/employees/login', formData);

      // Handle successful login
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Set Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      // Handle errors
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  // Define handleRegisterClick if needed
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
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

        {/* Login Form */}
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Employee Login</h2>
            {error && <div className="error">{error}</div>}
            {/* Username */}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Submit Button */}
            <button type="submit">Login</button>
          </form>
          {/* Register Container with Background */}
<div className="register-container">
  <div className="register-box">
    <p>Don't have an account?</p>
    <button className="register-button" onClick={handleRegisterClick}>
      Register Here
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
