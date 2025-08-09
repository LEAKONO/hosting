// services/api/analytics.js
import axios from 'axios'
import { formatPrice } from '../helpers/billing'
import { formatDate } from '../helpers/date'

const API_URL = import.meta.env.VITE_API_URL

export const getRevenueData = async (range = '30d') => {
  try {
    const response = await axios.get(`${API_URL}/analytics/revenue`, {
      params: { range }
    })
    return {
      ...response.data,
      current: formatPrice(response.data.current),
      previous: formatPrice(response.data.previous),
      change: `${(response.data.change * 100).toFixed(1)}%`,
      chartData: formatChartData(response.data.chartData)
    }
  } catch (error) {
    throw new Error('Failed to fetch revenue data')
  }
}

export const getUserGrowth = async (range = '30d') => {
  try {
    const response = await axios.get(`${API_URL}/analytics/users`, {
      params: { range }
    })
    return {
      ...response.data,
      current: response.data.current.toLocaleString(),
      previous: response.data.previous.toLocaleString(),
      change: `${(response.data.change * 100).toFixed(1)}%`,
      chartData: formatChartData(response.data.chartData)
    }
  } catch (error) {
    throw new Error('Failed to fetch user growth data')
  }
}

export const getServiceUsage = async (range = '30d') => {
  try {
    const response = await axios.get(`${API_URL}/analytics/services`, {
      params: { range }
    })
    return {
      ...response.data,
      chartData: formatChartData(response.data.chartData),
      topServices: response.data.topServices.map(service => ({
        ...service,
        percentage: `${(service.percentage * 100).toFixed(1)}%`
      }))
    }
  } catch (error) {
    throw new Error('Failed to fetch service usage data')
  }
}

const formatChartData = (data) => {
  return data.map(item => ({
    ...item,
    label: formatDate(item.date, { month: 'short', day: 'numeric' }),
    value: item.value || 0
  }))
}