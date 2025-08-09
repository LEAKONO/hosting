// services/helpers/auth.js
export const formatAuthError = (error) => {
  if (!error.response) return 'Network error - please try again later'
  
  switch (error.response.status) {
    case 400:
      return error.response.data.message || 'Invalid request'
    case 401:
      return 'Invalid email or password'
    case 403:
      return 'Account not verified - please check your email'
    case 409:
      return 'Email already in use'
    default:
      return 'Authentication failed - please try again'
  }
}

export const validatePassword = (password) => {
  const minLength = 8
  const hasNumber = /\d/
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/
  
  if (password.length < minLength) return 'Password must be at least 8 characters'
  if (!hasNumber.test(password)) return 'Password must contain a number'
  if (!hasSpecialChar.test(password)) return 'Password must contain a special character'
  
  return null
}