// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees/me');
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        // If unauthorized, redirect to login
        navigate('/');
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  };

  if (!employee){
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {employee.firstName}!</h2>
      <p>Username: {employee.username}</p>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.department}</p>
      {/* Display other employee information as needed */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
