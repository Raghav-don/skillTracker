import React, { useState } from 'react';
import '/Users/hello/Desktop/Projects/skill-tracker/frontend/src/App.css';

function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:5002/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        alert(data.msg);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <br></br>
            <br></br>
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <br></br>
            <br></br>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <br></br>
            <br></br>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
