// utils/validators.js

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePassword = (password) => {
  const errors = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return errors.length === 0 ? null : errors
}


export const validateAuthCode = (code) => {
  return code.length >= 8 && /^[A-Z0-9]+$/.test(code)
}


export const validateCreditCard = (number) => {
  const cleaned = number.replace(/\s+/g, '')
  return /^[0-9]{13,19}$/.test(cleaned) && luhnCheck(cleaned)
}

const luhnCheck = (num) => {
  let sum = 0
  
  for (let i = 0; i < num.length; i++) {
    let digit = parseInt(num[i])
    
    if ((num.length - i) % 2 === 0) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    
    sum += digit
  }
  
  return sum % 10 === 0
}