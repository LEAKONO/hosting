import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Loader, Alert } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';

const DomainRegistration = () => {
  const { registerDomain } = useAuth();
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [available, setAvailable] = useState(null);
  const [registrationPeriod, setRegistrationPeriod] = useState(1);
  const [registering, setRegistering] = useState(false);

  const handleDomainCheck = async (e) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    
    setChecking(true);
    setError('');
    setAvailable(null);
    
    try {
      // Simulate API call to check domain availability
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const isAvailable = Math.random() > 0.5;
      setAvailable(isAvailable);
      
      if (isAvailable) {
        setSuggestions([
          `${domain}.net`,
          `${domain}.org`,
          `my${domain}.com`,
          `${domain}app.com`
        ]);
      }
    } catch (error) {
      setError(error.message || 'Failed to check domain availability');
    } finally {
      setChecking(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!available) {
      setError('Domain is not available for registration');
      return;
    }
    
    setRegistering(true);
    setError('');
    
    try {
      // Simulate API call to register domain
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      navigate('/domains', { state: { success: `Domain ${domain} registered successfully!` } });
    } catch (error) {
      setError(error.message || 'Failed to register domain');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Register New Domain</h1>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      
      <Card className="mb-6">
        <form onSubmit={handleDomainCheck}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="example.com"
              />
            </div>
            <button
              type="submit"
              disabled={checking}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {checking ? 'Checking...' : 'Check Availability'}
            </button>
          </div>
        </form>
      </Card>
      
      {available !== null && (
        <Card className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">{domain}</h2>
            <span className={`px-3 py-1 rounded text-sm ${
              available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {available ? 'Available' : 'Not Available'}
            </span>
          </div>
          
          {available ? (
            <>
              <form onSubmit={handleRegister}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Registration Period
                    </label>
                    <select
                      value={registrationPeriod}
                      onChange={(e) => setRegistrationPeriod(Number(e.target.value))}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="1">1 Year ($12.99)</option>
                      <option value="2">2 Years ($23.99)</option>
                      <option value="3">3 Years ($34.99)</option>
                      <option value="5">5 Years ($54.99)</option>
                      <option value="10">10 Years ($99.99)</option>
                    </select>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={registering}
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
                    >
                      {registering ? 'Registering...' : 'Register Domain'}
                    </button>
                  </div>
                </div>
              </form>
              
              {suggestions.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Alternative Suggestions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestions.map((suggestion, index) => (
                      <div 
                        key={index} 
                        className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setDomain(suggestion);
                          setAvailable(null);
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span>{suggestion}</span>
                          <span className="text-green-600 text-sm">Available</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                The domain {domain} is already registered. Here are some alternatives:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setDomain(suggestion);
                      setAvailable(null);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>{suggestion}</span>
                      <span className="text-green-600 text-sm">Available</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default DomainRegistration;