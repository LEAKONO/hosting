// utils/constants.js
export const DOMAIN_TLDS = [
  '.com',
  '.net',
  '.org',
  '.co.ke',
  '.biz',
  '.info',
  '.xyz'
]

export const HOSTING_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    ram: '1GB',
    storage: '10GB SSD',
    bandwidth: 'Unmetered',
    websites: 1,
    price: 999 // KES
  },
  business: {
    id: 'business',
    name: 'Business',
    ram: '4GB',
    storage: '50GB SSD',
    bandwidth: 'Unmetered',
    websites: 'Unlimited',
    price: 2499 // KES
  }
}

export const INVOICE_STATUSES = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  pending: 'Pending',
  refunded: 'Refunded'
}

export const SECURITY_LEVELS = {
  low: { label: 'Low', color: 'green' },
  medium: { label: 'Medium', color: 'orange' },
  high: { label: 'High', color: 'red' }
}

export const COUNTRY_LIST = [
  { code: 'KE', name: 'Kenya' },
  { code: 'UG', name: 'Uganda' },
  { code: 'TZ', name: 'Tanzania' },
  // Add more countries as needed
]