import { NavLink } from 'react-router-dom'
import { 
  FaTachometerAlt,
  FaUsers,
  FaServer,
  FaMoneyBillWave,
  FaHeadset,
  FaChartLine,
  FaShieldAlt,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa'

export default function AdminSidebar({ isCollapsed = false }) {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Services', path: '/admin/services', icon: <FaServer /> },
    { name: 'Billing', path: '/admin/billing', icon: <FaMoneyBillWave /> },
    { name: 'Support', path: '/admin/support', icon: <FaHeadset /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FaChartLine /> },
    { name: 'Security', path: '/admin/security', icon: <FaShieldAlt /> },
    { name: 'Settings', path: '/admin/settings', icon: <FaCog /> }
  ]

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-gray-800 text-white h-full flex flex-col transition-all duration-300`}>
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
      )}

      <nav className="flex-1 p-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center ${isCollapsed ? 'justify-center px-2 py-4' : 'px-4 py-3'} rounded mb-1 ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'}`
            }
            title={isCollapsed ? item.name : ''}
          >
            <span className={`${isCollapsed ? '' : 'mr-3'}`}>{item.icon}</span>
            {!isCollapsed && item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-700">
        <a
          href="/logout"
          className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-4' : 'px-4 py-3'} text-gray-300 hover:bg-gray-700 rounded`}
          title={isCollapsed ? 'Sign Out' : ''}
        >
          <FaSignOutAlt className={`${isCollapsed ? '' : 'mr-3'}`} />
          {!isCollapsed && 'Sign Out'}
        </a>
      </div>
    </div>
  )
}