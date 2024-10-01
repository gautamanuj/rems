// frontend/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token'); // Example authentication check

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
