import React, { useState } from 'react';
import '/Users/hello/Desktop/Projects/skill-tracker/frontend/src/App.css';

function Login({ onLogin }) {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:5002/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if (res.ok && data.token) {
            localStorage.setItem('token', data.token);
            if (onLogin) onLogin(data.user);
            alert('Login successful');
        } else {
            alert(data.msg || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} required />
            <br></br>
            <br></br>
            <br></br>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <br></br>
            <br></br>

            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
