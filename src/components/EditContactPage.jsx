// frontend/src/components/EditContactPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EditContactPage.css'; // Create this CSS file for styling
import Header from './Header'; // Ensure Header component exists
import { useNavigate } from 'react-router-dom';

function EditContactPage() {
  const [contact, setContact] = useState({
    companyName: '',
    address: '',
    phone: '',
    email: '',
    website: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // For navigation after successful update

  useEffect(() => {
    // Fetch current contact details
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact');
        setContact(response.data);
      } catch (err) {
        console.error('Error fetching contact details:', err);
        setError('Failed to load contact details.');
      }
    };

    fetchContactDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setSuccess('Contact details updated successfully.');
      // Optionally, navigate back to Contact Page after a delay
      setTimeout(() => {
        navigate('/contact');
      }, 2000);
    } catch (err) {
      console.error('Error updating contact details:', err);
      setError('Failed to update contact details.');
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    navigate('/contact');
  };

  return (
    <div className="edit-contact-page">
      <Header /> {/* Include Header */}

      {/* Edit Contact Form */}
      <div className="edit-contact-form-container">
        <form className="edit-contact-form" onSubmit={handleSubmit}>
          <h2>Update Contact Information</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {/* Company Name */}
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={contact.companyName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={contact.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Website */}
          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={contact.website}
              onChange={handleChange}
            />
          </div>

          {/* Form Buttons */}
          <div className="form-buttons">
            <button type="submit" className="submit-button">Update</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditContactPage;
