// services/helpers/domains.js
export const formatDomainError = (error) => {
  if (!error.response) return 'Network error - please try again later'
  
  switch (error.response.status) {
    case 400:
      if (error.response.data?.error?.includes('invalid domain')) {
        return 'Invalid domain format - please check your input'
      }
      return error.response.data?.message || 'Invalid domain request'
    case 402:
      return 'Payment required - please update your billing information'
    case 409:
      if (error.response.data?.error?.includes('taken')) {
        return 'Domain is already registered'
      }
      return 'Domain conflict - please try a different name'
    case 422:
      return 'Domain validation failed - check TLD availability'
    default:
      return 'Domain operation failed - please try again'
  }
}

export const validateDomainName = (domain) => {
  if (!domain) return 'Domain name is required'
  
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/
  if (!regex.test(domain)) {
    return 'Invalid domain name format'
  }
  
  if (domain.includes('--')) {
    return 'Domain cannot contain consecutive hyphens'
  }
  
  if (domain.startsWith('-') || domain.endsWith('-')) {
    return 'Domain cannot start or end with a hyphen'
  }
  
  return null
}

export const getDomainSuggestions = (baseDomain, tlds = ['.com', '.net', '.org', '.co.ke']) => {
  if (!baseDomain || baseDomain.length < 2) return []
  
  const suggestions = []
  const variations = [
    baseDomain,
    `${baseDomain}online`,
    `${baseDomain}host`,
    `${baseDomain}kenya`,
    `get${baseDomain}`,
    `my${baseDomain}`
  ]
  
  variations.forEach(variation => {
    tlds.forEach(tld => {
      suggestions.push(`${variation}${tld}`)
    })
  })
  
  return suggestions.slice(0, 12) // Return max 12 suggestions
}

export const parseWhoisData = (whoisResponse) => {
  if (!whoisResponse) return null
  
  const importantFields = [
    'domain',
    'registrar',
    'creation_date',
    'expiration_date',
    'updated_date',
    'status',
    'name_servers'
  ]
  
  const result = {}
  importantFields.forEach(field => {
    if (whoisResponse[field]) {
      result[field] = Array.isArray(whoisResponse[field]) 
        ? whoisResponse[field].join(', ')
        : whoisResponse[field]
    }
  })
  
  return result
}