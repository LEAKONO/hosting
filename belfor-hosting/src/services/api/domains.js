// services/api/domains.js
import axios from 'axios'
import { formatDomainError } from '../helpers/domains'
import { formatDate } from '../helpers/date'

const API_URL = import.meta.env.VITE_API_URL

export const checkDomainAvailability = async (domain, tld) => {
  try {
    const response = await axios.get(`${API_URL}/domains/check`, {
      params: { domain, tld }
    })
    return {
      ...response.data,
      formattedPrice: formatPrice(response.data.price),
      formattedExpiry: response.data.available ? null : formatDate(response.data.expiry)
    }
  } catch (error) {
    throw new Error(formatDomainError(error))
  }
}

export const registerDomain = async (domainData) => {
  try {
    const response = await axios.post(`${API_URL}/domains/register`, domainData)
    return {
      ...response.data,
      formattedExpiry: formatDate(response.data.expiry)
    }
  } catch (error) {
    throw new Error(formatDomainError(error))
  }
}

export const transferDomain = async (domainData) => {
  try {
    const response = await axios.post(`${API_URL}/domains/transfer`, domainData)
    return response.data
  } catch (error) {
    throw new Error(formatDomainError(error))
  }
}

export const getUserDomains = async () => {
  try {
    const response = await axios.get(`${API_URL}/domains`)
    return response.data.map(domain => ({
      ...domain,
      formattedExpiry: formatDate(domain.expiry),
      formattedRegistration: formatDate(domain.registrationDate)
    }))
  } catch (error) {
    throw new Error(formatDomainError(error))
  }
}

export const renewDomain = async (domainId, years) => {
  try {
    const response = await axios.post(`${API_URL}/domains/${domainId}/renew`, { years })
    return {
      ...response.data,
      formattedExpiry: formatDate(response.data.expiry)
    }
  } catch (error) {
    throw new Error(formatDomainError(error))
  }
}