import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Loader, Alert } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';

const DomainTransfer = () => {
  const { transferDomain } = useAuth();
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [transferable, setTransferable] = useState(null);
  const [transferring, setTransferring] = useState(false);

  const handleTransferCheck = async (e) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }
    
    setChecking(true);
    setError('');
    setTransferable(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const isTransferable = Math.random() > 0.3;
      setTransferable(isTransferable);
    } catch (error) {
      setError(error.message || 'Failed to check domain transferability');
    } finally {
      setChecking(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    
    if (!transferable) {
      setError('Domain is not transferable');
      return;
    }
    
    if (!authCode.trim()) {
      setError('Authorization code is required');
      return;
    }
    
    setTransferring(true);
    setError('');
    
    try {
      // Simulate API call to transfer domain
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      navigate('/domains', { state: { success: `Domain ${domain} transfer initiated successfully!` } });
    } catch (error) {
      setError(error.message || 'Failed to initiate domain transfer');
    } finally {
      setTransferring(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Transfer Domain</h1>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      
      <Card className="mb-6">
        <form onSubmit={handleTransferCheck}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Domain Name</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="example.com"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={checking}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {checking ? 'Checking...' : 'Check Transferability'}
              </button>
            </div>
          </div>
        </form>
      </Card>
      
      {transferable !== null && (
        <Card>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold">{domain}</h2>
            <span className={`px-3 py-1 rounded text-sm ${
              transferable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {transferable ? 'Transferable' : 'Not Transferable'}
            </span>
          </div>
          
          {transferable ? (
            <form onSubmit={handleTransfer}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Authorization Code (EPP Code)
                  </label>
                  <input
                    type="text"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Obtain this code from your current registrar"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={transferring}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
                  >
                    {transferring ? 'Transferring...' : 'Initiate Transfer'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                The domain {domain} cannot be transferred. Common reasons include:
              </p>
              
              <ul className="list-disc pl-5 space-y-1">
                <li>Domain was registered within the last 60 days</li>
                <li>Domain is locked at the current registrar</li>
                <li>Domain has expired</li>
                <li>Domain has privacy protection enabled</li>
              </ul>
              
              <p className="text-gray-600">
                Please contact your current registrar for assistance.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default DomainTransfer;