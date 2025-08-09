import { useState } from 'react'
import { FaSearch, FaExchangeAlt, FaGlobe } from 'react-icons/fa'

export default function DomainSearchWidget() {
  const [domain, setDomain] = useState('')
  const [tld, setTld] = useState('.com')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)

  const tlds = ['.com', '.net', '.org', '.co.ke', '.biz', '.xyz']

  const handleSearch = () => {
    if (!domain.trim()) return
    
    setIsLoading(true)
    setTimeout(() => {
      setResult({
        available: Math.random() > 0.5,
        domain: `${domain}${tld}`,
        price: tld === '.co.ke' ? 'KES 1,200/yr' : 'KES 900/yr'
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <FaGlobe className="text-primary mr-2" />
        <h3 className="text-lg font-semibold">Register a New Domain</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 flex">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="yourdomain"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value)
              setResult(null)
            }}
          />
          <select
            className="border-t border-b border-r border-gray-300 rounded-r-lg px-2 bg-gray-50 focus:outline-none"
            value={tld}
            onChange={(e) => {
              setTld(e.target.value)
              setResult(null)
            }}
          >
            {tlds.map((ext) => (
              <option key={ext} value={ext}>
                {ext}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading || !domain.trim()}
          className="bg-primary hover:bg-green-800 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
        >
          {isLoading ? (
            'Searching...'
          ) : (
            <>
              <FaSearch /> Search
            </>
          )}
        </button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg mb-4 ${result.available ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex justify-between items-center">
            <span className="font-medium">{result.domain}</span>
            <span className="font-bold">
              {result.available ? (
                <>
                  {result.price} <span className="font-normal">- Available</span>
                </>
              ) : (
                'Not Available'
              )}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button className="flex items-center gap-2 text-primary border border-primary px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
          <FaExchangeAlt /> Transfer Domain
        </button>
        {result?.available && (
          <button className="bg-secondary hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors">
            Register Now
          </button>
        )}
      </div>
    </div>
  )
}
