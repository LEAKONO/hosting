import { Outlet } from 'react-router-dom'
import UserNav from '../components/layout/Navbar/UserNav'
import UserSidebar from '../components/layout/Sidebar/UserSidebar'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

export default function UserLayout() {
  const { theme } = useTheme()
  const { user } = useAuth()

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor)
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor)
  }, [theme])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.mode === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <UserNav />
      
      <div className="flex pt-14">
        <UserSidebar />
        
        <main className="flex-1 p-6 overflow-x-hidden">
          <Breadcrumbs />
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}