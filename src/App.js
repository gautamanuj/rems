// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegisterPage'; // Imports registration page component
import Dashboard from './components/Dashboard';
import ContactPage from './components/ContactPage'; // Import the ContactPage
import ProtectedRoute from './components/ProtectedRoute';
import EditContactPage from './components/EditContactPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/contact" element={<ContactPage />} /> {/* Add ContactPage Route */}
         {/* Protected Routes */}
         <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-contact"
          element={
            <ProtectedRoute>
              <EditContactPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
