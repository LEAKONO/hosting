// hooks/useDomains.js
import { useState } from 'react'
import { 
  checkDomainAvailability,
  registerDomain,
  transferDomain,
  getUserDomains,
  renewDomain
} from '../services/api/domains'
import { useNotification } from '../contexts/NotificationContext'

export function useDomains() {
  const [domains, setDomains] = useState([])
  const [availability, setAvailability] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast } = useNotification()

  const checkAvailability = async (domainName, tld) => {
    setLoading(true)
    setError(null)
    try {
      const result = await checkDomainAvailability(domainName, tld)
      setAvailability(result)
      return result
    } catch (err) {
      setError(err.message)
      showToast.error(err.message || 'Domain check failed')
      return null
    } finally {
      setLoading(false)
    }
  }

  const registerNewDomain = async (domainData) => {
    setLoading(true)
    try {
      const newDomain = await registerDomain(domainData)
      showToast.success(`${newDomain.name} registered successfully!`)
      await fetchUserDomains() // Refresh domain list
      return newDomain
    } catch (err) {
      setError(err.message)
      showToast.error(err.message || 'Domain registration failed')
      return null
    } finally {
      setLoading(false)
    }
  }

  const initiateTransfer = async (domainData) => {
    setLoading(true)
    try {
      const result = await transferDomain(domainData)
      showToast.success(`Transfer initiated for ${result.domain}`)
      await fetchUserDomains()
      return result
    } catch (err) {
      setError(err.message)
      showToast.error(err.message || 'Domain transfer failed')
      return null
    } finally {
      setLoading(false)
    }
  }

  const fetchUserDomains = async () => {
    setLoading(true)
    try {
      const domainList = await getUserDomains()
      setDomains(domainList)
      return domainList
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const renewUserDomain = async (domainId, years) => {
    setLoading(true)
    try {
      const renewedDomain = await renewDomain(domainId, years)
      showToast.success(`${renewedDomain.name} renewed for ${years} year(s)`)
      await fetchUserDomains()
      return renewedDomain
    } catch (err) {
      setError(err.message)
      showToast.error(err.message || 'Domain renewal failed')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    domains,
    availability,
    loading,
    error,
    checkAvailability,
    registerNewDomain,
    initiateTransfer,
    fetchUserDomains,
    renewUserDomain
  }
}