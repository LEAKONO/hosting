import Overview from './Overview'
import Analytics from './Analytics'
import Security from './Security'

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Overview Section */}
      <div className="mb-6">
        <Overview />
      </div>

      {/* Analytics Section */}
      <div className="mb-6">
        <Analytics />
      </div>

      {/* Security Section */}
      <div className="mb-6">
        <Security />
      </div>
    </div>
  )
}
