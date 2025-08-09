import React, { useState, useEffect } from 'react';
import { Card, Loader, Alert, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';

const SystemSettings = () => {
  const { getSystemSettings, updateSystemSettings } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSystemSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching system settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [getSystemSettings]);

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
      await updateSystemSettings(settings);
      setSuccess('System settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update system settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">System Name</label>
              <input
                type="text"
                name="systemName"
                value={settings.systemName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Default Timezone</label>
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
            
            <div>
              <label className="block text-sm font-medium mb-1">System Email</label>
              <input
                type="email"
                name="systemEmail"
                value={settings.systemEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleInputChange}
              />
              <label htmlFor="maintenanceMode">Maintenance Mode</label>
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Performance Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cache Duration (seconds)</label>
              <input
                type="number"
                name="cacheDuration"
                value={settings.cacheDuration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
              <input
                type="number"
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="1"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableGzip"
                name="enableGzip"
                checked={settings.enableGzip}
                onChange={handleInputChange}
              />
              <label htmlFor="enableGzip">Enable GZIP Compression</label>
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Password Policy</label>
              <select
                name="passwordPolicy"
                value={settings.passwordPolicy}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="low">Low (6+ characters)</option>
                <option value="medium">Medium (8+ characters, mixed case)</option>
                <option value="high">High (10+ characters, mixed case + numbers + symbols)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enable2FA"
                name="enable2FA"
                checked={settings.enable2FA}
                onChange={handleInputChange}
              />
              <label htmlFor="enable2FA">Require Two-Factor Authentication for Admin</label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableBruteForceProtection"
                name="enableBruteForceProtection"
                checked={settings.enableBruteForceProtection}
                onChange={handleInputChange}
              />
              <label htmlFor="enableBruteForceProtection">Enable Brute Force Protection</label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Failed Login Attempts Before Lockout</label>
              <input
                type="number"
                name="failedAttemptsBeforeLockout"
                value={settings.failedAttemptsBeforeLockout}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="1"
                max="10"
              />
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">Server Information</h3>
              <p className="text-sm text-gray-600">OS: {settings.serverInfo.os}</p>
              <p className="text-sm text-gray-600">Node: {settings.serverInfo.nodeVersion}</p>
              <p className="text-sm text-gray-600">Memory: {settings.serverInfo.memory}</p>
            </div>
            
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">Database Status</h3>
              <div className="flex items-center gap-2">
                <span>Status:</span>
                <Badge variant={settings.databaseStatus.connected ? 'success' : 'danger'}>
                  {settings.databaseStatus.connected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">Version: {settings.databaseStatus.version}</p>
            </div>
            
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">Last Backup</h3>
              <p className="text-sm text-gray-600">
                {settings.lastBackup ? settings.lastBackup : 'Never'}
              </p>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                Run Backup Now
              </button>
            </div>
            
            <div className="p-4 border rounded">
              <h3 className="font-medium mb-2">System Updates</h3>
              {settings.updatesAvailable ? (
                <>
                  <Badge variant="warning" className="mb-1">
                    Updates Available
                  </Badge>
                  <button className="mt-1 text-sm text-blue-600 hover:text-blue-800">
                    Check for Updates
                  </button>
                </>
              ) : (
                <Badge variant="success">System Up to Date</Badge>
              )}
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

export default SystemSettings;