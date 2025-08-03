import React, { useState } from 'react';

function AddSkill({ onSkillAdded }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    progress: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5002/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Skill added successfully!');
      setForm({ title: '', description: '', progress: 0 });
      if (onSkillAdded) onSkillAdded(); // refresh after add
    } else {
      const data = await res.json();
      alert(data.msg || 'Failed to add skill.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Skill Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="progress"
        type="number"
        placeholder="Progress (%)"
        value={form.progress}
        onChange={handleChange}
        min="0"
        max="100"
      />
      <button type="submit">Add Skill</button>
    </form>
  );
}

export default AddSkill;
