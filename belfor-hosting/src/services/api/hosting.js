// services/api/hosting.js
import axios from 'axios'
import { formatDate } from '../helpers/date'
import { formatPrice } from '../helpers/billing'

const API_URL = import.meta.env.VITE_API_URL

export const getHostingPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/hosting/plans`)
    return response.data.map(plan => ({
      ...plan,
      formattedPrice: formatPrice(plan.price),
      formattedRenewalPrice: formatPrice(plan.renewalPrice)
    }))
  } catch (error) {
    throw new Error('Failed to fetch hosting plans')
  }
}

export const getUserServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/hosting/services`)
    return response.data.map(service => ({
      ...service,
      formattedCreated: formatDate(service.createdAt),
      formattedExpiry: formatDate(service.expiresAt),
      formattedPrice: formatPrice(service.price)
    }))
  } catch (error) {
    throw new Error('Failed to fetch user services')
  }
}

export const createService = async (planId) => {
  try {
    const response = await axios.post(`${API_URL}/hosting/services`, { planId })
    return {
      ...response.data,
      formattedCreated: formatDate(response.data.createdAt),
      formattedExpiry: formatDate(response.data.expiresAt)
    }
  } catch (error) {
    throw new Error('Failed to create service')
  }
}

export const suspendService = async (serviceId) => {
  try {
    await axios.put(`${API_URL}/hosting/services/${serviceId}/suspend`)
  } catch (error) {
    throw new Error('Failed to suspend service')
  }
}

export const renewService = async (serviceId, period = 1) => {
  try {
    const response = await axios.post(
      `${API_URL}/hosting/services/${serviceId}/renew`,
      { period }
    )
    return {
      ...response.data,
      formattedExpiry: formatDate(response.data.expiresAt)
    }
  } catch (error) {
    throw new Error('Failed to renew service')
  }
}