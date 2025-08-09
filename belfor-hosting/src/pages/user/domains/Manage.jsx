import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Loader, Alert, Badge } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

const DomainManagement = () => {
  const { id } = useParams();
  const { getDomainDetails, updateDomain } = useAuth();
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    autoRenew: false,
    nameservers: []
  });

  useEffect(() => {
    const fetchDomain = async () => {
      try {
        const data = await getDomainDetails(id);
        setDomain(data);
        setFormData({
          autoRenew: data.autoRenew,
          nameservers: [...data.nameservers]
        });
      } catch (error) {
        setError(error.message || 'Failed to load domain details');
      } finally {
        setLoading(false);
      }
    };
    fetchDomain();
  }, [id, getDomainDetails]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNameserverChange = (index, value) => {
    const newNameservers = [...formData.nameservers];
    newNameservers[index] = value;
    setFormData(prev => ({
      ...prev,
      nameservers: newNameservers
    }));
  };

  const addNameserver = () => {
    setFormData(prev => ({
      ...prev,
      nameservers: [...prev.nameservers, '']
    }));
  };

  const removeNameserver = (index) => {
    const newNameservers = formData.nameservers.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      nameservers: newNameservers
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');
    
    try {
      await updateDomain(id, formData);
      setSuccess('Domain settings updated successfully');
      // Refresh domain data
      const data = await getDomainDetails(id);
      setDomain(data);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update domain settings');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!domain) return <Alert variant="warning">Domain not found</Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Domain</h1>
        <Badge 
          variant={
            domain.status === 'active' ? 'success' : 
            domain.status === 'expired' ? 'danger' : 'warning'
          }
        >
          {domain.status}
        </Badge>
      </div>
      
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">{domain.name}</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Registration Date:</span>
                <span>{formatDate(domain.registrationDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date:</span>
                <span>{formatDate(domain.expiryDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Registrar:</span>
                <span>{domain.registrar}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Auto Renew:</span>
                <span>{domain.autoRenew ? 'Enabled' : 'Disabled'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">DNS Records</h3>
            <div className="bg-gray-50 p-4 rounded">
              {domain.dnsRecords.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-1">Type</th>
                      <th className="text-left py-1">Name</th>
                      <th className="text-left py-1">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domain.dnsRecords.map((record, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-1">{record.type}</td>
                        <td className="py-1">{record.name}</td>
                        <td className="py-1">{record.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No DNS records found</p>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">Domain Settings</h2>
        
        {success && <Alert variant="success" className="mb-4">{success}</Alert>}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoRenew"
                name="autoRenew"
                checked={formData.autoRenew}
                onChange={handleInputChange}
              />
              <label htmlFor="autoRenew">Enable Auto-Renewal</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nameservers</label>
              <div className="space-y-2">
                {formData.nameservers.map((ns, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ns}
                      onChange={(e) => handleNameserverChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded"
                      placeholder="ns1.example.com"
                    />
                    {formData.nameservers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNameserver(index)}
                        className="bg-red-500 text-white px-2 rounded"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                {formData.nameservers.length < 4 && (
                  <button
                    type="button"
                    onClick={addNameserver}
                    className="bg-gray-200 px-3 py-1 rounded text-sm"
                  >
                    + Add Nameserver
                  </button>
                )}
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={updating}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {updating ? 'Updating...' : 'Update Settings'}
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DomainManagement;