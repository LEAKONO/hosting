import { Outlet } from 'react-router-dom'
import MainNav from '../components/layout/Navbar/MainNav'
import Footer from '../components/layout/Footer'
import { useTheme } from '../contexts/ThemeContext'
import { useEffect } from 'react'

export default function MainLayout() {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor)
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor)
    document.body.className = theme.mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
  }, [theme])

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${theme.mode === 'dark' ? 'dark' : ''}`}>
      <MainNav />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}