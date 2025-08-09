import React, { useState, useEffect } from 'react';
import { Card, Loader, Alert } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';

const SecuritySettings = () => {
  const { getSecuritySettings, updatePassword, enableTwoFactor, disableTwoFactor } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSecuritySettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching security settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [getSecuritySettings]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setUpdating(true);
    setError('');
    setSuccess('');
    
    try {
      await updatePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );
      setSuccess('Password updated successfully');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update password');
    } finally {
      setUpdating(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    if (!settings) return;
    
    setUpdating(true);
    setError('');
    setSuccess('');
    
    try {
      if (settings.twoFactorEnabled) {
        await disableTwoFactor();
        setSettings(prev => ({ ...prev, twoFactorEnabled: false }));
        setSuccess('Two-factor authentication disabled');
      } else {
        await enableTwoFactor();
        setSettings(prev => ({ ...prev, twoFactorEnabled: true }));
        setSuccess('Two-factor authentication enabled');
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update two-factor authentication');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !settings) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Password</h2>
        
        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded"
                required
                minLength="8"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded"
                required
                minLength="8"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={updating}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
              >
                {updating ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </div>
        </form>
      </Card>
      
      <Card className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Status: 
              <span className={`ml-2 ${
                settings.twoFactorEnabled ? 'text-green-600' : 'text-red-600'
              }`}>
                {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {settings.twoFactorEnabled
                ? 'Two-factor authentication adds an extra layer of security to your account.'
                : 'Enable two-factor authentication for enhanced security.'}
            </p>
          </div>
          
          <button
            onClick={handleTwoFactorToggle}
            disabled={updating}
            className={`px-4 py-2 rounded ${
              settings.twoFactorEnabled
                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
        
        {settings.twoFactorEnabled && (
          <div className="mt-4 p-4 bg-yellow-50 rounded">
            <h3 className="font-medium mb-2">Recovery Codes</h3>
            <p className="text-sm text-gray-600 mb-2">
              Save these recovery codes in a secure place. They can be used to access your account if you lose your two-factor device.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {settings.recoveryCodes.map((code, index) => (
                <div key={index} className="p-2 bg-white rounded font-mono">
                  {code}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold mb-4">Active Sessions</h2>
        
        <div className="space-y-4">
          {settings.activeSessions.map((session, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {session.device} {session.current && '(Current)'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {session.ipAddress} • {session.location}
                  </p>
                </div>
                {!session.current && (
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Revoke
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Last active: {session.lastActive}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SecuritySettings;