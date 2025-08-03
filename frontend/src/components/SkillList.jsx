import React, { useState } from 'react';

function SkillList({ skills, onSkillDeleted }) {
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', progress: 0 });

  // Begin edit
  const handleEdit = (skill) => {
    setEditingSkillId(skill._id);
    setEditForm({
      title: skill.title,
      description: skill.description,
      progress: skill.progress,
    });
  };

  // Save edited skill
  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5002/api/skills/${editingSkillId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      alert('Skill updated');
      setEditingSkillId(null);
      if (onSkillDeleted) onSkillDeleted(); // reload
    } else {
      const data = await res.json();
      alert(data.msg || 'Update failed');
    }
  };

  // Delete skill
  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5002/api/skills/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });

    if (res.ok) {
      alert('Skill deleted');
      if (onSkillDeleted) onSkillDeleted();
    } else {
      const data = await res.json();
      alert(data.msg || 'Delete failed');
    }
  };

  return (
    <div>
      <h3>Your Skills</h3>
      <ul>
        {skills.map(skill => (
          <li key={skill._id} style={{ marginBottom: '1rem' }}>
            {editingSkillId === skill._id ? (
              <>
                <input
                  name="title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
                <input
                  name="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                <input
                  name="progress"
                  type="number"
                  value={editForm.progress}
                  onChange={(e) => setEditForm({ ...editForm, progress: e.target.value })}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingSkillId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <strong>{skill.title}</strong>: {skill.progress}%<br />
                <small>{skill.description}</small><br />
                <button onClick={() => handleEdit(skill)}>Edit</button>
                <button onClick={() => handleDelete(skill._id)} style={{ marginLeft: '10px' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillList;
