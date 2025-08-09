import React, { useState, useEffect } from 'react';
import { Card, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatNumber, formatCurrency } from '../../utils/formatters';

const ConversionAnalytics = () => {
  const { getConversionAnalytics } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('last30');
  const [funnelStage, setFunnelStage] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConversionAnalytics(timeRange, funnelStage);
        setData(response);
      } catch (error) {
        console.error('Error fetching conversion analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange, funnelStage, getConversionAnalytics]);

  if (loading || !data) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Conversion Analytics</h1>
        
        <div className="flex gap-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="last7">Last 7 Days</option>
            <option value="last30">Last 30 Days</option>
            <option value="last90">Last 90 Days</option>
          </select>
          
          <select 
            value={funnelStage} 
            onChange={(e) => setFunnelStage(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Stages</option>
            <option value="visitors">Visitors</option>
            <option value="signups">Signups</option>
            <option value="trials">Trials</option>
            <option value="conversions">Conversions</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Visitors">
          <p className="text-3xl font-semibold">
            {formatNumber(data.totalVisitors)}
          </p>
          <p className={`text-sm ${data.visitorsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.visitorsChange >= 0 ? '↑' : '↓'} {Math.abs(data.visitorsChange)}%
          </p>
        </Card>
        
        <Card title="Signups">
          <p className="text-3xl font-semibold">
            {formatNumber(data.signups)}
          </p>
          <p className="text-sm text-gray-600">
            {data.signupRate}% conversion
          </p>
        </Card>
        
        <Card title="Trials">
          <p className="text-3xl font-semibold">
            {formatNumber(data.trials)}
          </p>
          <p className="text-sm text-gray-600">
            {data.trialRate}% conversion
          </p>
        </Card>
        
        <Card title="Conversions">
          <p className="text-3xl font-semibold">
            {formatNumber(data.conversions)}
          </p>
          <p className="text-sm text-gray-600">
            {data.conversionRate}% conversion
          </p>
        </Card>
      </div>

      <Card title="Funnel Visualization" className="mb-8">
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          Funnel Chart Placeholder
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Conversion Paths">
          <div className="space-y-4">
            {data.conversionPaths.map((path, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <p className="font-medium">{path.path}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">
                    {formatNumber(path.occurrences)} occurrences
                  </span>
                  <Badge variant="info">{path.conversionRate}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Top Converting Sources">
          <div className="space-y-3">
            {data.topSources.map((source, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{source.source}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{formatNumber(source.visitors)}</span>
                  <span className="font-semibold">{source.conversionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConversionAnalytics;