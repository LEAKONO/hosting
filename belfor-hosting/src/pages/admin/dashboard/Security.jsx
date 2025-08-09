import React, { useState, useEffect } from 'react';
import { Card, Loader, Badge, Alert } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';

const DashboardSecurity = () => {
  const { getSecurityDashboard } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSecurityDashboard();
        setData(response);
      } catch (error) {
        console.error('Error fetching security dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getSecurityDashboard]);

  if (loading || !data) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Dashboard</h1>
      
      {data.criticalAlerts > 0 && (
        <Alert variant="danger" className="mb-6">
          You have {data.criticalAlerts} critical security alerts that require immediate attention.
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Security Score">
          <p className="text-3xl font-semibold">
            {data.securityScore}/100
          </p>
          <div className="w-full bg-gray-200 rounded h-2 mt-2">
            <div 
              className={`h-2 rounded ${
                data.securityScore > 80 ? 'bg-green-500' : 
                data.securityScore > 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
              style={{ width: `${data.securityScore}%` }}
            ></div>
          </div>
        </Card>
        
        <Card title="Active Threats">
          <p className="text-3xl font-semibold">
            {data.activeThreats}
          </p>
          <p className="text-sm text-gray-600">
            {data.criticalAlerts} critical
          </p>
        </Card>
        
        <Card title="Failed Logins">
          <p className="text-3xl font-semibold">
            {data.failedLogins}
          </p>
          <p className="text-sm text-gray-600">
            Last 24 hours
          </p>
        </Card>
        
        <Card title="Patches Needed">
          <p className="text-3xl font-semibold">
            {data.patchesNeeded}
          </p>
          <p className="text-sm text-gray-600">
            {data.criticalPatches} critical
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card title="Threat Activity">
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Threat Activity Chart Placeholder
            </div>
          </Card>
        </div>
        <Card title="Recent Security Events">
          <div className="space-y-4">
            {data.recentEvents.map((event, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium">{event.type}</p>
                  <Badge 
                    variant={
                      event.severity === 'high' ? 'danger' : 
                      event.severity === 'medium' ? 'warning' : 'info'
                    }
                    className="text-xs"
                  >
                    {event.severity}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{event.source}</p>
                <p className="text-xs text-gray-500">{event.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Security Recommendations">
        <div className="space-y-4">
          {data.recommendations.length > 0 ? (
            data.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={`mt-1 w-3 h-3 rounded-full ${
                  rec.priority === 'high' ? 'bg-red-500' : 
                  rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-medium">{rec.title}</p>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recommendations at this time</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DashboardSecurity;