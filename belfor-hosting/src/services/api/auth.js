import axios from 'axios'
import { formatAuthError } from '../helpers/auth'

const API_URL = import.meta.env.VITE_API_URL

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials)
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error))
  }
}

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData)
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error))
  }
}

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`)
  } catch (error) {
    throw new Error('Failed to logout')
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`)
    return response.data
  } catch (error) {
    throw new Error('Not authenticated')
  }
}

export const forgotPassword = async (email) => {
  try {
    await axios.post(`${API_URL}/auth/forgot-password`, { email })
  } catch (error) {
    throw new Error('Failed to send reset email')
  }
}

export const resetPassword = async (token, newPassword) => {
  try {
    await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword })
  } catch (error) {
    throw new Error('Failed to reset password')
  }
}

/** ✅ NEW: Update user profile */
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/auth/profile`, profileData)
    return response.data
  } catch (error) {
    throw new Error('Failed to update profile')
  }
}

/** ✅ NEW: Change user password */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/auth/change-password`, {
      currentPassword,
      newPassword
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to change password')
  }
}
