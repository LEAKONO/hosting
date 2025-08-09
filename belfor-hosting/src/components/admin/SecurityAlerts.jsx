import { FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa'

export default function SecurityAlerts() {
  const alerts = [
    { id: 1, type: 'high', message: 'Unauthorized login attempt', time: '2 mins ago' },
    { id: 2, type: 'high', message: 'Multiple failed logins', time: '15 mins ago' },
    { id: 3, type: 'medium', message: 'New device login', time: '1 hour ago' }
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center">
          <FaShieldAlt className="mr-2 text-primary" />
          Security Alerts
        </h3>
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
          2 High Severity
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-start">
            <div className={`mt-1 mr-3 ${alert.type === 'high' ? 'text-red-500' : 'text-yellow-500'}`}>
              <FaExclamationTriangle />
            </div>
            <div className="flex-1">
              <p className="font-medium">{alert.message}</p>
              <p className="text-xs text-gray-500">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-4 w-full text-sm text-primary font-medium hover:underline">
        View All Alerts (35)
      </button>
    </div>
  )
}