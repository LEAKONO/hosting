// hooks/useAuth.js
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin, logout as apiLogout, register } from '../services/api/auth'
import { useNotification } from '../contexts/NotificationContext'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { showToast } = useNotification()

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const userData = await apiLogin(email, password)
      setUser(userData)
      showToast.success('Login successful!')
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
      return true
    } catch (err) {
      setError(err.message)
      showToast.error(err.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await apiLogout()
      setUser(null)
      showToast.success('Logged out successfully')
      navigate('/login')
    } catch (err) {
      showToast.error(err.message || 'Logout failed')
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const newUser = await register(userData)
      showToast.success('Account created successfully!')
      navigate('/login')
      return newUser
    } catch (err) {
      setError(err.message)
      showToast.error(err.message || 'Registration failed')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  }
}