// hooks/useAdmin.js
import { useState, useEffect } from 'react'
import { 
  getUsers,
  suspendUser,
  activateUser,
  getSystemStats,
  getRecentActivity
} from '../services/api/admin'

export function useAdmin() {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleUserStatus = async (userId, isActive) => {
    try {
      setLoading(true)
      if (isActive) {
        await suspendUser(userId)
      } else {
        await activateUser(userId)
      }
      await fetchUsers() // Refresh user list
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [statsData, activityData] = await Promise.all([
        getSystemStats(),
        getRecentActivity()
      ])
      setStats(statsData)
      setActivity(activityData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return {
    users,
    stats,
    activity,
    loading,
    error,
    fetchUsers,
    toggleUserStatus,
    refreshData: fetchDashboardData
  }
}