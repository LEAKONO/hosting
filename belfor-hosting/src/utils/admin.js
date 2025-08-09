// utils/admin.js
/**
 * Formats admin dashboard data for display
 */
export const formatDashboardData = (data) => {
  return {
    ...data,
    formattedUsers: {
      total: data.users.total.toLocaleString(),
      active: data.users.active.toLocaleString(),
      suspended: data.users.suspended.toLocaleString()
    },
    formattedRevenue: formatCurrency(data.revenue.total),
    growthRate: `${(data.growth.rate * 100).toFixed(1)}%`
  }
}

/**
 * Generates admin report filters
 */
export const getReportFilters = (timeRange = '30d') => {
  const filters = {
    '24h': { label: 'Last 24 Hours', days: 1 },
    '7d': { label: 'Last 7 Days', days: 7 },
    '30d': { label: 'Last 30 Days', days: 30 },
    '90d': { label: 'Last Quarter', days: 90 }
  }
  
  return filters[timeRange] || filters['30d']
}

/**
 * Validates admin action payloads
 */
export const validateAdminAction = (action, payload) => {
  const validActions = ['suspend', 'activate', 'reset_password']
  
  if (!validActions.includes(action)) {
    throw new Error(`Invalid admin action: ${action}`)
  }
  
  if (action === 'reset_password' && !payload.userId) {
    throw new Error('User ID is required for password reset')
  }
  
  return true
}