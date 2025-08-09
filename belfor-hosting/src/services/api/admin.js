// services/api/admin.js
import axios from 'axios'
import { formatDate } from '../helpers/date'
import { formatPrice } from '../helpers/billing'

const API_URL = import.meta.env.VITE_API_URL

export const getUsers = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`, { params })
    return response.data.map(user => ({
      ...user,
      formattedCreated: formatDate(user.createdAt),
      lastLogin: user.lastLogin ? formatDate(user.lastLogin) : 'Never'
    }))
  } catch (error) {
    throw new Error('Failed to fetch users')
  }
}

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users/${userId}`)
    return {
      ...response.data,
      formattedCreated: formatDate(response.data.createdAt),
      formattedServices: response.data.services.map(service => ({
        ...service,
        formattedDate: formatDate(service.createdAt)
      }))
    }
  } catch (error) {
    throw new Error('Failed to fetch user details')
  }
}

export const suspendUser = async (userId) => {
  try {
    await axios.put(`${API_URL}/admin/users/${userId}/suspend`)
  } catch (error) {
    throw new Error('Failed to suspend user')
  }
}

export const activateUser = async (userId) => {
  try {
    await axios.put(`${API_URL}/admin/users/${userId}/activate`)
  } catch (error) {
    throw new Error('Failed to activate user')
  }
}

export const getSystemStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/stats`)
    return {
      ...response.data,
      formattedRevenue: formatPrice(response.data.revenue),
      formattedGrowth: `${(response.data.growth * 100).toFixed(2)}%`
    }
  } catch (error) {
    throw new Error('Failed to fetch system stats')
  }
}

export const getRecentActivity = async (limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/admin/activity`, {
      params: { limit }
    })
    return response.data.map(activity => ({
      ...activity,
      formattedDate: formatDate(activity.timestamp, {
        hour: '2-digit',
        minute: '2-digit'
      })
    }))
  } catch (error) {
    throw new Error('Failed to fetch recent activity')
  }
}
// Add these exports if missing
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/auth/profile`, profileData)
    return response.data
  } catch (error) {
    throw new Error(formatAuthError(error))
  }
}

export const changePassword = async (passwordData) => {
  try {
    await axios.put(`${API_URL}/auth/password`, passwordData)
  } catch (error) {
    throw new Error(formatAuthError(error))
  }
}