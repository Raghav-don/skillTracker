import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import SkillList from './components/SkillList.jsx';
import '/Users/hello/Desktop/Projects/skill-tracker/frontend/src/App.css'


function App() {
    const [user, setUser] = useState(null);

    return (
        <div class="Homepage">
            <h1>Skill Tracker App</h1>
            {!user ? (
                <>
                    <h2>Login</h2>
                    <Login onLogin={setUser} />
                    <br></br>
                    <h2>Or Register</h2>
                    <Register />
                </>
            ) : (
                <>
                    <p>Welcome, {user.username}!</p>
                    <SkillList />
                </>
            )}
        </div>
    );
}

export default App;
