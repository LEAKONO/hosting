// hooks/useAnalytics.js
import { useState, useEffect } from 'react'
import { 
  getRevenueData,
  getUserGrowth,
  getServiceUsage,
  getTicketMetrics
} from '../services/api/analytics'

export function useAnalytics(timeRange = '30d') {
  const [metrics, setMetrics] = useState({
    revenue: null,
    growth: null,
    usage: null,
    tickets: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    try {
      const [revenue, growth, usage, tickets] = await Promise.all([
        getRevenueData(timeRange),
        getUserGrowth(timeRange),
        getServiceUsage(timeRange),
        getTicketMetrics(timeRange)
      ])
      
      setMetrics({
        revenue,
        growth,
        usage,
        tickets
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const refresh = () => {
    fetchAnalytics()
  }

  return {
    ...metrics,
    loading,
    error,
    refresh,
    timeRange
  }
}