// helpers/auth.js

export const formatAuthError = (error) => {
  if (!error.response) {
    return 'Network error. Please check your connection.'
  }

  const { status, data } = error.response

  switch (status) {
    case 400:
      return data.message || 'Invalid request. Please check your input.'
    case 401:
      return data.message || 'Invalid credentials. Please try again.'
    case 403:
      return data.message || 'Access denied. You do not have permission.'
    case 404:
      return data.message || 'Resource not found.'
    case 409:
      return data.message || 'User already exists with this email.'
    case 422:
      // Handle validation errors
      if (data.errors) {
        return Object.values(data.errors).join(', ')
      }
      return data.message || 'Validation failed. Please check your input.'
    case 429:
      return 'Too many attempts. Please try again later.'
    case 500:
      return 'Server error. Please try again later.'
    default:
      return data.message || 'An unexpected error occurred.'
  }
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

export const getPasswordStrength = (password) => {
  if (!password) return 0
  
  let strength = 0
  if (password.length >= 8) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++
  
  return strength
}

export const getPasswordStrengthLabel = (strength) => {
  switch (strength) {
    case 0:
    case 1:
      return 'Very Weak'
    case 2:
      return 'Weak'
    case 3:
      return 'Medium'
    case 4:
      return 'Strong'
    case 5:
      return 'Very Strong'
    default:
      return 'Very Weak'
  }
}

export const sanitizeUserInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
}

export const generateRandomToken = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

export const getTokenExpiration = (token) => {
  const payload = decodeToken(token)
  return payload ? new Date(payload.exp * 1000) : null
}

export default {
  formatAuthError,
  validateEmail,
  validatePassword,
  getPasswordStrength,
  getPasswordStrengthLabel,
  sanitizeUserInput,
  generateRandomToken,
  isTokenExpired,
  decodeToken,
  getTokenExpiration
}