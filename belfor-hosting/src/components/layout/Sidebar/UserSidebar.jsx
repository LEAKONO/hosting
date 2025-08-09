import { NavLink } from 'react-router-dom'
import { 
  FaTachometerAlt,
  FaServer,
  FaGlobe,
  FaFileInvoiceDollar,
  FaTicketAlt,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa'

export default function UserSidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/user/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Services', path: '/user/services', icon: <FaServer /> },
    { name: 'Domains', path: '/user/domains', icon: <FaGlobe /> },
    { name: 'Billing', path: '/user/billing', icon: <FaFileInvoiceDollar /> },
    { name: 'Support', path: '/user/tickets', icon: <FaTicketAlt /> },
    { name: 'Settings', path: '/user/settings', icon: <FaCog /> }
  ]

  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Client Area</h2>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded mb-1 ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'}`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <a
          href="/logout"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded"
        >
          <FaSignOutAlt className="mr-3" />
          Sign Out
        </a>
      </div>
    </div>
  )
}