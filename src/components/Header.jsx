// frontend/src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling
import logo from '../assets/logo.png'; // Ensure the logo image is placed correctly

function Header() {
  return (
    <header className="app-header">
      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="ROSTERS EMS Logo" className="logo" />
        </Link>
      </div>

      {/* Company Name Section */}
      <div className="company-name-container">
        <h1 className="company-name">ROSTERS EMS</h1>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
