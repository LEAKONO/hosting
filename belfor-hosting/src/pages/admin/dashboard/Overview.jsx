import React, { useState, useEffect } from 'react';
import { Card, Loader } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const DashboardOverview = () => {
  const { getDashboardOverview } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardOverview(dateRange);
        setData(response);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange, getDashboardOverview]);

  if (loading || !data) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="last90">Last 90 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Revenue">
          <p className="text-3xl font-semibold">
            {formatCurrency(data.revenue.total)}
          </p>
          <p className={`text-sm ${data.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.revenue.change >= 0 ? '↑' : '↓'} {Math.abs(data.revenue.change)}% from previous period
          </p>
        </Card>
        
        <Card title="New Customers">
          <p className="text-3xl font-semibold">
            {formatNumber(data.customers.new)}
          </p>
          <p className={`text-sm ${data.customers.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.customers.change >= 0 ? '↑' : '↓'} {Math.abs(data.customers.change)}% from previous period
          </p>
        </Card>
        
        <Card title="Active Services">
          <p className="text-3xl font-semibold">
            {formatNumber(data.services.active)}
          </p>
          <p className="text-sm text-gray-600">
            {data.services.suspended} suspended
          </p>
        </Card>
        
        <Card title="Support Tickets">
          <p className="text-3xl font-semibold">
            {formatNumber(data.tickets.open)}
          </p>
          <p className="text-sm text-gray-600">
            {data.tickets.resolved} resolved this period
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card title="Revenue Trend">
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Revenue Chart Placeholder
            </div>
          </Card>
        </div>
        <Card title="Recent Activity">
          <div className="space-y-4">
            {data.recentActivity.map((activity, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.user}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Services">
          <div className="space-y-3">
            {data.topServices.map((service, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{service.name}</span>
                <span className="font-semibold">{formatCurrency(service.revenue)}</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="System Alerts">
          <div className="space-y-3">
            {data.alerts.length > 0 ? (
              data.alerts.map((alert, index) => (
                <div key={index} className="p-3 bg-red-50 rounded">
                  <p className="font-medium text-red-800">{alert.title}</p>
                  <p className="text-sm text-red-600">{alert.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No critical alerts</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;