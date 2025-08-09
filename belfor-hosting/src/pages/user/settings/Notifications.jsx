import React, { useState, useEffect } from 'react';
import { Card, Loader, Alert } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';

const NotificationSettings = () => {
  const { getNotificationSettings, updateNotificationSettings } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getNotificationSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [getNotificationSettings]);

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
      await updateNotificationSettings(settings);
      setSuccess('Notification settings updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update notification settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
      
      {error && <Alert variant="danger" className="mb-6">{error}</Alert>}
      {success && <Alert variant="success" className="mb-6">{success}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Account Notifications</label>
                <p className="text-sm text-gray-600">
                  Important notifications about your account
                </p>
              </div>
              <input
                type="checkbox"
                name="accountEmails"
                checked={settings.accountEmails}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Billing Notifications</label>
                <p className="text-sm text-gray-600">
                  Invoices, payment receipts, and billing reminders
                </p>
              </div>
              <input
                type="checkbox"
                name="billingEmails"
                checked={settings.billingEmails}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Service Notifications</label>
                <p className="text-sm text-gray-600">
                  Service status updates and maintenance notices
                </p>
              </div>
              <input
                type="checkbox"
                name="serviceEmails"
                checked={settings.serviceEmails}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Promotional Emails</label>
                <p className="text-sm text-gray-600">
                  Special offers and product updates
                </p>
              </div>
              <input
                type="checkbox"
                name="promotionalEmails"
                checked={settings.promotionalEmails}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">In-App Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Ticket Updates</label>
                <p className="text-sm text-gray-600">
                  Notifications about support ticket activity
                </p>
              </div>
              <input
                type="checkbox"
                name="ticketNotifications"
                checked={settings.ticketNotifications}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Service Alerts</label>
                <p className="text-sm text-gray-600">
                  Important alerts about your services
                </p>
              </div>
              <input
                type="checkbox"
                name="serviceAlerts"
                checked={settings.serviceAlerts}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium mb-1">Announcements</label>
                <p className="text-sm text-gray-600">
                  System-wide announcements and updates
                </p>
              </div>
              <input
                type="checkbox"
                name="announcementNotifications"
                checked={settings.announcementNotifications}
                onChange={handleInputChange}
                className="h-5 w-5 text-blue-600 rounded"
              />
            </div>
          </div>
        </Card>
        
        <Card className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Notification Frequency</label>
              <select
                name="frequency"
                value={settings.frequency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="immediately">Immediately</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Notification Method</label>
              <select
                name="preferredMethod"
                value={settings.preferredMethod}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="email">Email</option>
                <option value="inapp">In-App Only</option>
                <option value="both">Both</option>
              </select>
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

export default NotificationSettings;