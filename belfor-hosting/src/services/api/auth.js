import axios from 'axios'
import { formatAuthError } from '../helpers/auth'

const API_URL = "" 

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    const { token, user } = response.data
    
    if (token) {
      localStorage.setItem('token', token)
    }
    
    return { token, user }
  } catch (error) {
    throw new Error(formatAuthError(error))
  }
}

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    // Expected response: { token, user: { id, email, name, role, createdAt } }
    const { token, user } = response.data
    
    if (token) {
      localStorage.setItem('token', token)
    }
    
    // ✅ Return just the user object to match AuthContext expectation
    return user
  } catch (error) {
    throw new Error(formatAuthError(error))
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
    // Clear local storage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Logout error:', error)
    // Still clear local storage even if API call fails
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    throw new Error('Failed to logout')
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me')
    // Expected response: { id, email, name, role, createdAt, updatedAt, ... }
    return response.data
  } catch (error) {
    // Clear invalid token
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
    }
    throw new Error('Not authenticated')
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to send reset email')
  }
}

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post('/auth/reset-password', { 
      token, 
      newPassword 
    })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to reset password')
  }
}

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/auth/profile', profileData)
    // Expected response: updated user object
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to update profile')
  }
}

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword
    })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to change password')
  }
}

export const verifyEmail = async (token) => {
  try {
    const response = await api.post('/auth/verify-email', { token })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to verify email')
  }
}

export const resendVerificationEmail = async (email) => {
  try {
    const response = await api.post('/auth/resend-verification', { email })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to resend verification email')
  }
}

export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile')
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to fetch profile')
  }
}

export const updateUserPreferences = async (preferences) => {
  try {
    const response = await api.put('/auth/preferences', preferences)
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to update preferences')
  }
}

export const deleteAccount = async (password) => {
  try {
    const response = await api.delete('/auth/account', {
      data: { password }
    })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to delete account')
  }
}

export const getSessions = async () => {
  try {
    const response = await api.get('/auth/sessions')
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to fetch sessions')
  }
}

export const revokeSession = async (sessionId) => {
  try {
    const response = await api.delete(`/auth/sessions/${sessionId}`)
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to revoke session')
  }
}

export const setup2FA = async () => {
  try {
    const response = await api.post('/auth/2fa/setup')
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to setup 2FA')
  }
}

export const verify2FA = async (token) => {
  try {
    const response = await api.post('/auth/2fa/verify', { token })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to verify 2FA')
  }
}

export const disable2FA = async (token) => {
  try {
    const response = await api.post('/auth/2fa/disable', { token })
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error) || 'Failed to disable 2FA')
  }
}

// Social authentication
export const socialLogin = async (provider, code) => {
  try {
    const response = await api.post(`/auth/social/${provider}`, { code })
    const { token, user } = response.data
    
    if (token) {
      localStorage.setItem('token', token)
    }
    
    return { token, user }
  } catch (error) {
    throw new Error(formatAuthError(error) || `Failed to login with ${provider}`)
  }
}

// Export the axios instance for other services to use
export { api as authAPI }

// Create the default export object correctly
const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  updateProfile,
  changePassword,
  verifyEmail,
  resendVerificationEmail,
  getProfile,
  updateUserPreferences,
  deleteAccount,
  getSessions,
  revokeSession,
  setup2FA,
  verify2FA,
  disable2FA,
  socialLogin,
  api: api 
}

export default authService