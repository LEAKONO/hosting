import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

export default function RevenueWidget() {
  const data = {
    labels: ['Hosting', 'Domains', 'SSL', 'Addons'],
    datasets: [
      {
        data: [65, 15, 10, 10],
        backgroundColor: [
          '#006400',
          '#BB0000',
          '#FFC107',
          '#17A2B8'
        ],
        borderWidth: 0
      }
    ]
  }

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: KES ${context.raw * 1000}`
          }
        }
      }
    },
    cutout: '70%'
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Revenue Breakdown</h3>
      
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-40 h-40 md:mr-6">
          <Doughnut data={data} options={options} />
        </div>
        
        <div className="mt-4 md:mt-0">
          {data.labels.map((label, index) => (
            <div key={label} className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
              />
              <span className="text-sm mr-2">{label}</span>
              <span className="text-sm font-medium">
                {data.datasets[0].data[index]}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t text-center">
        <p className="text-sm text-gray-500">Total Revenue</p>
        <p className="text-xl font-bold">KES 784,000</p>
      </div>
    </div>
  )
}