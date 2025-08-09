// services/helpers/date.js
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
  
  return new Date(dateString).toLocaleDateString(
    'en-US', 
    { ...defaultOptions, ...options }
  )
}

export const daysUntil = (dateString) => {
  const today = new Date()
  const targetDate = new Date(dateString)
  const diffTime = targetDate - today
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const isExpired = (dateString) => {
  return daysUntil(dateString) < 0
}