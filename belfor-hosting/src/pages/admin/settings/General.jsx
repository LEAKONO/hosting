import React, { useState, useEffect } from 'react';
import { Card, Loader, Alert } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';

const GeneralSettings = () => {
  const { getGeneralSettings, updateGeneralSettings } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getGeneralSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching general settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [getGeneralSettings]);

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
      await updateGeneralSettings(settings);
      setSuccess('General settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update general settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">General Settings</h1>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Company Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={settings.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={settings.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">State/Region</label>
                <input
                  type="text"
                  name="state"
                  value={settings.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={settings.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={settings.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Branding</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Logo URL</label>
              <input
                type="url"
                name="logoUrl"
                value={settings.logoUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
              {settings.logoUrl && (
                <div className="mt-2">
                  <img 
                    src={settings.logoUrl} 
                    alt="Company Logo" 
                    className="h-16 object-contain"
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Favicon URL</label>
              <input
                type="url"
                name="faviconUrl"
                value={settings.faviconUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Primary Color</label>
              <input
                type="color"
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleInputChange}
                className="h-10 w-20 cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Secondary Color</label>
              <input
                type="color"
                name="secondaryColor"
                value={settings.secondaryColor}
                onChange={handleInputChange}
                className="h-10 w-20 cursor-pointer"
              />
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Localization</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Default Language</label>
              <select
                name="defaultLanguage"
                value={settings.defaultLanguage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date Format</label>
              <select
                name="dateFormat"
                value={settings.dateFormat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Time Format</label>
              <select
                name="timeFormat"
                value={settings.timeFormat}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="12">12-hour</option>
                <option value="24">24-hour</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Timezone</label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">SMTP Host</label>
              <input
                type="text"
                name="smtpHost"
                value={settings.smtpHost}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">SMTP Port</label>
              <input
                type="number"
                name="smtpPort"
                value={settings.smtpPort}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="1"
                max="65535"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">SMTP Username</label>
              <input
                type="text"
                name="smtpUsername"
                value={settings.smtpUsername}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">SMTP Password</label>
              <input
                type="password"
                name="smtpPassword"
                value={settings.smtpPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">From Email</label>
              <input
                type="email"
                name="fromEmail"
                value={settings.fromEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">From Name</label>
              <input
                type="text"
                name="fromName"
                value={settings.fromName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="smtpSecure"
                name="smtpSecure"
                checked={settings.smtpSecure}
                onChange={handleInputChange}
              />
              <label htmlFor="smtpSecure">Use SSL/TLS</label>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;