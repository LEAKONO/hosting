// utils/formatters.js

export const formatCurrency = (amount, currency = 'KES') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount)
}


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


export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`
}


export const formatDomainRecords = (records) => {
  return records.map(record => ({
    ...record,
    formattedDate: formatDate(record.updatedAt),
    statusBadge: record.active ? 'Active' : 'Inactive'
  }))
}