import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function GrowthChart({ title = 'User Growth', dataPoints = [] }) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Users',
        data: dataPoints.length ? dataPoints : [1200, 1900, 1500, 2000, 2200, 2500, 2800],
        borderColor: '#006400',
        backgroundColor: 'rgba(0, 100, 0, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">{title}</h3>
      <Line data={data} options={options} />
      <div className="mt-2 flex justify-between text-xs text-gray-500">
        <span>Overall Growth: 35.80%</span>
        <span>Monthly: 45.20%</span>
        <span>Daily: 5.50%</span>
      </div>
    </div>
  )
}