import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService, { getCurrentUser as apiGetCurrentUser } from '../services/api/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Utility to safely call API functions
  const safeApiCall = async (fn, fallback = null) => {
    try {
      if (!process.env.REACT_APP_API_URL) return fallback // skip API calls if no backend
      return await fn()
    } catch {
      return fallback
    }
  }

  useEffect(() => {
    async function loadUser() {
      const currentUser = await safeApiCall(apiGetCurrentUser, null)
      setUser(currentUser)
      setLoading(false)
    }
    loadUser()
  }, [])

  const login = async (credentials) => {
    setLoading(true)
    try {
      const loggedInUser = await safeApiCall(() => authService.login(credentials), { user: null, token: null })
      setUser(loggedInUser?.user || null)

      if (loggedInUser?.user?.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error?.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    try {
      const newUser = await safeApiCall(() => authService.register(userData), null)
      setUser(newUser)

      if (newUser?.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error?.message || 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await safeApiCall(authService.logout, null)
      setUser(null)
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
