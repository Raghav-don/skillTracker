import React, { useEffect, useState } from 'react';
import SkillPieChart from './SkillPieChart.jsx';
import SkillBarChart from './SkillBarChart.jsx';
import '/Users/hello/Desktop/Projects/skill-tracker/frontend/src/App.css';

function SkillList() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchSkills() {
      const res = await fetch('http://localhost:5002/api/skills', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      if (res.ok) {
        const data = await res.json();
        setSkills(data);
      }
    }
    fetchSkills();
  }, []);

  return (
    <div>
      <h2>Your Skills</h2>
      {/* Render Pie and Bar charts */}
      <SkillPieChart skills={skills} />
      <SkillBarChart skills={skills} />

      <ul>
        {skills.map(skill => (
          <li key={skill._id}>
            {skill.title} - {skill.progress}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkillList;
