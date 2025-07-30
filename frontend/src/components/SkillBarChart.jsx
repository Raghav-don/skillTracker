import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
);

function SkillBarChart({ skills }) {
  if (!skills || skills.length === 0) {
    return <p>No skill data available.</p>;
  }

  const data = {
    labels: skills.map(skill => skill.title),
    datasets: [
      {
        label: "Progress (%)",
         data:skills.map(skill => skill.progress),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Skill Progress Chart"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10
        }
      }
    }
  };

  return (
    <div>
      <h3>Progress Overview</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SkillBarChart;
