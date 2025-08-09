import React, { useState, useEffect } from 'react';
import { Card, Loader, Alert, Badge, Table } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatCurrency, formatDate } from '../../utils/formatters';

const AffiliateSettings = () => {
  const { getAffiliateSettings, updateAffiliateSettings, getAffiliateStats } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, statsData] = await Promise.all([
          getAffiliateSettings(),
          getAffiliateStats()
        ]);
        setSettings(settingsData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching affiliate data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAffiliateSettings, getAffiliateStats]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      await updateAffiliateSettings(settings);
      setSuccess('Affiliate settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update affiliate settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings || !stats) return <Loader />;

  const columns = [
    { header: 'Affiliate', accessor: 'affiliateName' },
    { header: 'Signups', accessor: 'signups' },
    { header: 'Conversions', accessor: 'conversions' },
    { header: 'Commission', accessor: 'commission', format: formatCurrency },
    { header: 'Last Activity', accessor: 'lastActivity', format: formatDate }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Affiliate Program</h1>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Program Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enabled"
                name="enabled"
                checked={settings.enabled}
                onChange={handleInputChange}
              />
              <label htmlFor="enabled">Enable Affiliate Program</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Commission Rate (%)</label>
              <input
                type="number"
                name="commissionRate"
                value={settings.commissionRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cookie Duration (days)</label>
              <input
                type="number"
                name="cookieDuration"
                value={settings.cookieDuration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Minimum Payout</label>
              <input
                type="number"
                name="minimumPayout"
                value={settings.minimumPayout}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Payout Method</label>
              <select
                name="payoutMethod"
                value={settings.payoutMethod}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
                <option value="check">Check</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Terms & Conditions</label>
              <textarea
                name="terms"
                value={settings.terms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                rows="5"
              />
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end mb-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Program Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium text-gray-600 mb-1">Total Affiliates</h3>
            <p className="text-3xl font-bold">{stats.totalAffiliates}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium text-gray-600 mb-1">Active Affiliates</h3>
            <p className="text-3xl font-bold">{stats.activeAffiliates}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium text-gray-600 mb-1">Total Commission</h3>
            <p className="text-3xl font-bold">{formatCurrency(stats.totalCommission)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium text-gray-600 mb-1">Signups</h3>
            <p className="text-3xl font-bold">{stats.signups}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium text-gray-600 mb-1">Conversions</h3>
            <p className="text-3xl font-bold">{stats.conversions}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium text-gray-600 mb-1">Conversion Rate</h3>
            <p className="text-3xl font-bold">{stats.conversionRate}%</p>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">Top Affiliates</h2>
        
        <Table 
          data={stats.topAffiliates} 
          columns={columns} 
        />
      </Card>
    </div>
  );
};

export default AffiliateSettings;