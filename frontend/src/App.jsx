import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import AddSkill from './components/AddSkill';
import SkillList from './components/SkillList';
import SkillBarChart from './components/SkillBarChart';
import SkillPieChart from './components/SkillPieChart';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Load skills on login
  useEffect(() => {
    if (user) fetchSkills();
  }, [user]);

  const fetchSkills = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5002/api/skills', {
        headers: {
          'x-auth-token': token,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      } else {
        const error = await res.json();
        console.warn('Fetch skills failed:', error.msg);
      }
    } catch (err) {
      console.error('Skill fetch error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSkills([]);
  };

  return (
    <Router>
      <div className="Homepage">
        <h1>Skill Tracker App</h1>

        {user && (
          <div style={{ textAlign: 'right' }}>
            <Link to="/profile"><button>Edit Profile</button></Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </div>
        )}

        <Routes>

          {/* Public Routes */}
          {!user ? (
            <>
              <Route
                path="/"
                element={
                  <>
                    <h2>Login</h2>
                    <Login onLogin={setUser} />
                    <h2>Or Register</h2>
                    <Register />
                  </>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (

            // Protected Routes
            <>
              <Route
                path="/"
                element={
                  <>
                    <p>Welcome, <strong>{user.username}</strong>!</p>
                    <AddSkill onSkillAdded={fetchSkills} />
                    <SkillList skills={skills} onSkillDeleted={fetchSkills} />

                    {/* Bar & Pie Charts */}
                    {skills.length > 0 && (
                      <>
                        <SkillBarChart skills={skills} />
                        <SkillPieChart skills={skills} />
                      </>
                    )}
                  </>
                }
              />

              <Route
                path="/profile"
                element={<Profile user={user} />}
              />

              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
