import { 
  FaUserPlus, 
  FaServer, 
  FaFileInvoiceDollar, 
  FaHeadset,
  FaChartLine,
  FaShieldAlt,
  FaBox,
  FaUserShield
} from 'react-icons/fa'

export default function QuickAdminActions() {
  const actions = [
    { icon: <FaUserPlus />, label: 'Add User', path: '/admin/users/add' },
    { icon: <FaServer />, label: 'Manage Services', path: '/admin/services' },
    { icon: <FaFileInvoiceDollar />, label: 'Billing', path: '/admin/billing' },
    { icon: <FaHeadset />, label: 'Support', path: '/admin/support' },
    { icon: <FaChartLine />, label: 'Analytics', path: '/admin/analytics' },
    { icon: <FaShieldAlt />, label: 'Security', path: '/admin/security' },
    { icon: <FaBox />, label: 'Products', path: '/admin/products' },
    { icon: <FaUserShield />, label: 'Staff', path: '/admin/staff' }
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-primary text-xl mb-2">{action.icon}</span>
            <span className="text-sm text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}