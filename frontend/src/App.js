// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
// import Dashboard from './components/Dashboard'; // Later when built

function App() {
  const [user, setUser] = useState(null);

  // Optional: try to get user info from localStorage token (basic placeholder)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Normally you'd decode token or fetch user data
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) setUser(storedUser);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        {/* Later: maybe a Navbar with logout */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Add dashboard route once ready */}
          {/* <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} /> */}

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
