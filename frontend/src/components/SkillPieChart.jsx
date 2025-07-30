import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function SkillPieChart({ skills }) {
  const bins = { Beginner: 0, Intermediate: 0, Advanced: 0 };
  for (const skill of skills) {
    if (skill.progress < 34) bins.Beginner++;
    else if (skill.progress < 67) bins.Intermediate++;
    else bins.Advanced++;
  }

  const data = {
    labels: Object.keys(bins),
    datasets: [
      {
        label: 'Skill Levels',
        data: Object.values(bins),
        backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  return (
    <div>
      <h3>Skill Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
}

export default SkillPieChart;
