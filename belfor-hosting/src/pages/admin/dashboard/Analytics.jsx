import React, { useState, useEffect } from 'react';
import { Card, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatNumber, formatCurrency } from '../../utils/formatters';

const DashboardAnalytics = () => {
  const { getAnalyticsDashboard } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30');
  const [metric, setMetric] = useState('visitors');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalyticsDashboard(dateRange);
        setData(response);
      } catch (error) {
        console.error('Error fetching analytics dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dateRange, getAnalyticsDashboard]);

  if (loading || !data) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        
        <div className="flex gap-4">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
          </select>
          
          <select 
            value={metric} 
            onChange={(e) => setMetric(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="visitors">Visitors</option>
            <option value="conversions">Conversions</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Visitors">
          <p className="text-3xl font-semibold">
            {formatNumber(data.visitors.total)}
          </p>
          <p className={`text-sm ${data.visitors.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.visitors.change >= 0 ? '↑' : '↓'} {Math.abs(data.visitors.change)}% from previous period
          </p>
        </Card>
        
        <Card title="Conversion Rate">
          <p className="text-3xl font-semibold">
            {data.conversionRate}%
          </p>
          <p className={`text-sm ${data.conversionRateChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.conversionRateChange >= 0 ? '↑' : '↓'} {Math.abs(data.conversionRateChange)}%
          </p>
        </Card>
        
        <Card title="Avg. Session Duration">
          <p className="text-3xl font-semibold">
            {data.avgSessionDuration} min
          </p>
          <p className={`text-sm ${data.sessionDurationChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.sessionDurationChange >= 0 ? '↑' : '↓'} {Math.abs(data.sessionDurationChange)}%
          </p>
        </Card>
        
        <Card title="Revenue per Visitor">
          <p className="text-3xl font-semibold">
            {formatCurrency(data.revenuePerVisitor)}
          </p>
          <p className={`text-sm ${data.revenuePerVisitorChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.revenuePerVisitorChange >= 0 ? '↑' : '↓'} {Math.abs(data.revenuePerVisitorChange)}%
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card title="Traffic Analytics">
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              {metric === 'visitors' && 'Visitors Chart Placeholder'}
              {metric === 'conversions' && 'Conversions Chart Placeholder'}
              {metric === 'revenue' && 'Revenue Chart Placeholder'}
            </div>
          </Card>
        </div>
        <Card title="Top Traffic Sources">
          <div className="space-y-4">
            {data.trafficSources.map((source, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{source.source}</span>
                  <Badge variant="info">{source.percentage}%</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded h-2 mt-1">
                  <div 
                    className="h-2 rounded bg-blue-500" 
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {formatNumber(source.visitors)} visitors
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Performing Pages">
          <div className="space-y-3">
            {data.topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="truncate">{page.page}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{page.views} views</span>
                  <span className="text-sm font-semibold">{page.conversionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Device Breakdown">
          <div className="flex justify-around items-center h-full">
            {data.devices.map((device, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">{device.percentage}%</span>
                </div>
                <p className="font-medium">{device.type}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAnalytics;