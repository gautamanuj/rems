// frontend/src/components/ContactPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactPage.css'; // Import the CSS file for styling
import logo from '../assets/logo.png'; // Ensure the logo image is placed correctly
import Header from './Header'; // Import the Header component

import { useNavigate } from 'react-router-dom';

function ContactPage() {
  const [contact, setContact] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contact details from the backend
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

  
  // const handleEdit = () => {
  //   navigate('/edit-contact');
  // };

// Handle navigation to edit contact details
const handleEdit = () => {
  navigate('/edit-contact'); // Navigate to the Edit Contact page
};

if (error) {
  return (
    <div>
      <Header /> {/* Include Header */}
      <div className="error-message">{error}</div>
    </div>
  );
}

if (!contact) {
  return (
    <div>
      <Header /> {/* Include Header */}
      <div className="loading">Loading contact details...</div>
    </div>
  );
}
return (
  <div className="contact-page">
    <Header /> {/* Include Header */}

    {/* Contact Details Section */}
    <div className="contact-details">
      <h2>Contact Us</h2>
      <p><strong>Address:</strong> {contact.address}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
      {contact.website && (
        <p><strong>Website:</strong> <a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a></p>
      )}
  
        {/* Add more contact details as needed */}
      </div>

      {/* Optional: Edit Contact Button (for authenticated users) */}
      {/* <button className="edit-button" onClick={handleEdit}>Edit Contact Details</button> */}
    </div>
  );
}

export default ContactPage;
