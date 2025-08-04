import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ user, setUser }) {
  const [form, setForm] = useState({
    username: user?.username || '',
    idNumber: user?.idNumber || '',
    role: user?.role || 'technician',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5002/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Profile updated successfully!');
        setUser(data.user); // ✅ Update user in parent state
        navigate('/'); // ✅ Go back to homepage
      } else {
        alert(data.msg || data.error || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Something went wrong: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <label>ID Number:</label>
        <input
          type="text"
          name="idNumber"
          value={form.idNumber}
          onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
        />

        <label>Role:</label>
        <select
          name="role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="developer">Developer</option>
          <option value="tester">Tester</option>
          <option value="technician">Technician</option>
        </select>

        <br /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Profile;
