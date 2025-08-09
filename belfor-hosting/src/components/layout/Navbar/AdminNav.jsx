import { Link } from 'react-router-dom'
import { FaBell, FaUserShield, FaChevronDown, FaBars } from 'react-icons/fa'
import { useState } from 'react'

export default function AdminNav({ onMenuToggle }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={onMenuToggle}
              className="mr-4 text-gray-500 hover:text-primary md:hidden"
            >
              <FaBars size={20} />
            </button>
            <Link to="/admin/dashboard" className="text-xl font-bold text-primary">
              Admin Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary relative">
              <FaBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUserShield size={20} className="text-gray-600" />
                </div>
                <span className="hidden md:inline text-gray-700">Admin</span>
                <FaChevronDown size={14} className={`text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    System Settings
                  </Link>
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}