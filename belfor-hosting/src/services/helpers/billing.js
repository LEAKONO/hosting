// services/helpers/billing.js
export const formatPrice = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount)
}

export const formatInvoiceStatus = (status) => {
  const statusMap = {
    paid: { text: 'Paid', color: 'green' },
    unpaid: { text: 'Unpaid', color: 'red' },
    pending: { text: 'Pending', color: 'yellow' },
    refunded: { text: 'Refunded', color: 'blue' }
  }
  return statusMap[status] || { text: status, color: 'gray' }
}

export const calculateDueDate = (date, days = 14) => {
  const dueDate = new Date(date)
  dueDate.setDate(dueDate.getDate() + days)
  return dueDate
}