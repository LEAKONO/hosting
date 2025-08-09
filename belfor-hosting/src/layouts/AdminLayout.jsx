import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from '../components/layout/Navbar/AdminNav'
import AdminSidebar from '../components/layout/Sidebar/AdminSidebar'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/common/Loader' // Default import

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { theme } = useTheme()
  const { user, loading } = useAuth()

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor)
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor)
  }, [theme])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" color={theme.mode === 'dark' ? 'white' : 'primary'} />
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.mode === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <AdminNav onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex pt-16">
        <AdminSidebar isCollapsed={!sidebarOpen} />
        
        <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} flex-1 p-6`}>
          <Breadcrumbs />
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}