// utils/hosting.js
import { HOSTING_PLANS } from './constants'


export const calculatePlanPrice = (planId, months = 1, vatRate = 0.16) => {
  const plan = HOSTING_PLANS[planId]
  if (!plan) throw new Error('Invalid hosting plan')
  
  const subtotal = plan.price * months
  const vat = subtotal * vatRate
  const total = subtotal + vat
  
  return {
    subtotal,
    vat,
    total,
    perMonth: total / months
  }
}


export const validateHostingConfig = (config) => {
  const errors = {}
  
  if (!config.domain) {
    errors.domain = 'Domain is required'
  }
  
  if (!config.plan || !HOSTING_PLANS[config.plan]) {
    errors.plan = 'Please select a valid hosting plan'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}


export const generateServerName = (domain) => {
  const cleanDomain = domain.replace(/^www\./, '').replace(/\./g, '-')
  return `srv-${cleanDomain.slice(0, 10)}`.toLowerCase()
}