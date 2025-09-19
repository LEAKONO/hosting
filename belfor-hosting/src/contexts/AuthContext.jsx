import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin, logout as authLogout, getCurrentUser, register as authRegister } from '../services/api/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const login = async (credentials) => {
    try {
      setLoading(true)
      const loggedInUser = await authLogin(credentials)
      setUser(loggedInUser)
      
      if (loggedInUser.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const newUser = await authRegister(userData)
      setUser(newUser)
      
      // Redirect to appropriate dashboard after registration
      if (newUser.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      await authLogout()
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