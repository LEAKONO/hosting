import React, { useState, useEffect } from 'react';
import { Card, Loader, Badge, Alert } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';

const ServiceMonitor = () => {
  const { getServiceStatus } = useAdmin();
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getServiceStatus();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching service status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatus();
    
    if (autoRefresh) {
      const interval = setInterval(fetchStatus, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, getServiceStatus]);

  const getOverallStatus = () => {
    if (status.some(s => s.status === 'down')) return 'critical';
    if (status.some(s => s.status === 'degraded')) return 'warning';
    return 'healthy';
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Service Monitoring</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span>Overall Status:</span>
          <Badge 
            variant={
              getOverallStatus() === 'healthy' ? 'success' : 
              getOverallStatus() === 'warning' ? 'warning' : 'danger'
            }
          >
            {getOverallStatus().toUpperCase()}
          </Badge>
        </div>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={() => setAutoRefresh(!autoRefresh)}
          />
          Auto-refresh (30s)
        </label>
      </div>

      {getOverallStatus() !== 'healthy' && (
        <Alert variant={getOverallStatus() === 'critical' ? 'danger' : 'warning'} className="mb-6">
          {getOverallStatus() === 'critical' 
            ? 'Critical services are down. Immediate attention required.' 
            : 'Some services are experiencing degraded performance.'}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {status.map((service) => (
          <Card key={service.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
              <Badge 
                variant={
                  service.status === 'up' ? 'success' : 
                  service.status === 'degraded' ? 'warning' : 'danger'
                }
              >
                {service.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Uptime:</span>
                <span>{service.uptime}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-2">
                <div 
                  className={`h-2 rounded ${
                    service.uptime > 99 ? 'bg-green-500' : 
                    service.uptime > 95 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${service.uptime}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-semibold">Last Check:</span> {service.lastChecked}
              </p>
              {service.message && (
                <p className="text-sm mt-1">
                  <span className="font-semibold">Message:</span> {service.message}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceMonitor;