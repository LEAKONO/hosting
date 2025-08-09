// services/api/security.js
import axios from 'axios'
import { formatDate } from '../helpers/date'

const API_URL = import.meta.env.VITE_API_URL

export const getSecurityAlerts = async (severity = 'all') => {
  try {
    const response = await axios.get(`${API_URL}/security/alerts`, {
      params: { severity }
    })
    return response.data.map(alert => ({
      ...alert,
      formattedDate: formatDate(alert.timestamp),
      severity: alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)
    }))
  } catch (error) {
    throw new Error('Failed to fetch security alerts')
  }
}

export const getLoginHistory = async (userId = null) => {
  try {
    const params = userId ? { userId } : {}
    const response = await axios.get(`${API_URL}/security/logins`, { params })
    return response.data.map(login => ({
      ...login,
      formattedDate: formatDate(login.timestamp, {
        hour: '2-digit',
        minute: '2-digit'
      }),
      success: login.success ? 'Successful' : 'Failed'
    }))
  } catch (error) {
    throw new Error('Failed to fetch login history')
  }
}

export const enableTwoFactor = async () => {
  try {
    const response = await axios.post(`${API_URL}/security/2fa/enable`)
    return response.data
  } catch (error) {
    throw new Error('Failed to enable two-factor authentication')
  }
}

export const verifyTwoFactor = async (token) => {
  try {
    await axios.post(`${API_URL}/security/2fa/verify`, { token })
  } catch (error) {
    throw new Error('Invalid verification code')
  }
}

export const getAuditLogs = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/security/audit`, {
      params: { page }
    })
    return {
      ...response.data,
      logs: response.data.logs.map(log => ({
        ...log,
        formattedDate: formatDate(log.timestamp)
      }))
    }
  } catch (error) {
    throw new Error('Failed to fetch audit logs')
  }
}