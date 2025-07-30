import React, { useState } from 'react';

function AddSkill({ onSkillAdded }) {
    const [form, setForm] = useState({ title: '', description: '', progress: 0 });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.name === 'progress' ? +e.target.value : e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5002/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.msg || 'Error adding skill');
                return;
            }

            const newSkill = await res.json();
            onSkillAdded(newSkill);
            setForm({ title: '', description: '', progress: 0 });
        } catch (err) {
            alert('Server error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Skill Title" value={form.title} onChange={handleChange} required />
            <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <input name="progress" type="number" placeholder="Progress %" value={form.progress} onChange={handleChange} required />
            <button type="submit">Add Skill</button>
        </form>
    );
}

export default AddSkill;
