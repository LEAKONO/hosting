import React, { useState, useEffect } from 'react';
import { Card, Loader } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatNumber, formatCurrency } from '../../utils/formatters';

const GrowthAnalytics = () => {
  const { getGrowthAnalytics } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('last12');
  const [metric, setMetric] = useState('revenue');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getGrowthAnalytics(timeRange);
        setData(response);
      } catch (error) {
        console.error('Error fetching growth analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange, getGrowthAnalytics]);

  const getMetricData = () => {
    if (!data) return [];
    switch (metric) {
      case 'revenue': return data.revenue;
      case 'customers': return data.customers;
      case 'services': return data.services;
      case 'traffic': return data.traffic;
      default: return [];
    }
  };

  const getMetricTitle = () => {
    switch (metric) {
      case 'revenue': return 'Revenue';
      case 'customers': return 'Customers';
      case 'services': return 'Services';
      case 'traffic': return 'Traffic';
      default: return '';
    }
  };

  const getTotal = () => {
    const metricData = getMetricData();
    if (!metricData.length) return 0;
    return metricData.reduce((sum, item) => sum + item.value, 0);
  };

  const getGrowthRate = () => {
    if (!data) return 0;
    switch (metric) {
      case 'revenue': return data.revenueGrowth;
      case 'customers': return data.customersGrowth;
      case 'services': return data.servicesGrowth;
      case 'traffic': return data.trafficGrowth;
      default: return 0;
    }
  };

  if (loading || !data) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Growth Analytics</h1>
        
        <div className="flex gap-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="last3">Last 3 Months</option>
            <option value="last6">Last 6 Months</option>
            <option value="last12">Last 12 Months</option>
          </select>
          
          <select 
            value={metric} 
            onChange={(e) => setMetric(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="revenue">Revenue</option>
            <option value="customers">Customers</option>
            <option value="services">Services</option>
            <option value="traffic">Traffic</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title={`Total ${getMetricTitle()}`}>
          <p className="text-3xl font-semibold">
            {metric === 'revenue' 
              ? formatCurrency(getTotal()) 
              : formatNumber(getTotal())}
          </p>
        </Card>
        
        <Card title="Growth Rate">
          <p className="text-3xl font-semibold">
            {getGrowthRate()}%
          </p>
          <p className={`text-sm ${getGrowthRate() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {getGrowthRate() >= 0 ? '↑' : '↓'} from previous period
          </p>
        </Card>
        
        <Card title="Best Month">
          <p className="text-3xl font-semibold">
            {metric === 'revenue' 
              ? formatCurrency(data.bestMonth.value) 
              : formatNumber(data.bestMonth.value)}
          </p>
          <p className="text-sm text-gray-600">
            {data.bestMonth.month}
          </p>
        </Card>
      </div>

      <Card title={`${getMetricTitle()} Growth`} className="mb-8">
        <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
          {metric === 'revenue' && 'Revenue Growth Chart Placeholder'}
          {metric === 'customers' && 'Customers Growth Chart Placeholder'}
          {metric === 'services' && 'Services Growth Chart Placeholder'}
          {metric === 'traffic' && 'Traffic Growth Chart Placeholder'}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="MRR Breakdown">
          <div className="space-y-3">
            {data.mrrBreakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.type}</span>
                <span className="font-semibold">{formatCurrency(item.amount)}</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Customer Acquisition">
          <div className="space-y-3">
            {data.acquisitionChannels.map((channel, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{channel.channel}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{formatNumber(channel.customers)}</span>
                  <span className="font-semibold">{formatCurrency(channel.ltv)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GrowthAnalytics;