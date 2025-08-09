import React, { useState, useEffect } from 'react';
import { Card, Loader } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatNumber, formatCurrency } from '../../utils/formatters';

const AnalyticsTrends = () => {
  const { getAnalyticsTrends } = useAdmin();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('last30');
  const [metric, setMetric] = useState('visitors');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalyticsTrends(timeRange);
        setData(response);
      } catch (error) {
        console.error('Error fetching analytics trends:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange, getAnalyticsTrends]);

  const getMetricValue = () => {
    if (!data) return 0;
    switch (metric) {
      case 'visitors': return formatNumber(data.totalVisitors);
      case 'pageviews': return formatNumber(data.totalPageviews);
      case 'conversions': return formatNumber(data.totalConversions);
      case 'revenue': return formatCurrency(data.totalRevenue);
      default: return 0;
    }
  };

  const getMetricChange = () => {
    if (!data) return 0;
    switch (metric) {
      case 'visitors': return data.visitorsChange;
      case 'pageviews': return data.pageviewsChange;
      case 'conversions': return data.conversionsChange;
      case 'revenue': return data.revenueChange;
      default: return 0;
    }
  };

  if (loading || !data) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Analytics Trends</h1>
        
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
            value={metric} 
            onChange={(e) => setMetric(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="visitors">Visitors</option>
            <option value="pageviews">Pageviews</option>
            <option value="conversions">Conversions</option>
            <option value="revenue">Revenue</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total">
          <p className="text-3xl font-semibold">
            {getMetricValue()}
          </p>
          <p className={`text-sm ${getMetricChange() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {getMetricChange() >= 0 ? '↑' : '↓'} {Math.abs(getMetricChange())}% from previous period
          </p>
        </Card>
        
        <Card title="Average Per Day">
          <p className="text-3xl font-semibold">
            {metric === 'revenue' 
              ? formatCurrency(data.averagePerDay) 
              : formatNumber(data.averagePerDay)}
          </p>
        </Card>
        
        <Card title="Best Day">
          <p className="text-3xl font-semibold">
            {metric === 'revenue' 
              ? formatCurrency(data.bestDay.value) 
              : formatNumber(data.bestDay.value)}
          </p>
          <p className="text-sm text-gray-600">
            {data.bestDay.date}
          </p>
        </Card>
      </div>

      <Card title="Trend Analysis" className="mb-8">
        <div className="h-96 bg-gray-100 rounded flex items-center justify-center">
          {metric === 'visitors' && 'Visitors Trend Chart Placeholder'}
          {metric === 'pageviews' && 'Pageviews Trend Chart Placeholder'}
          {metric === 'conversions' && 'Conversions Trend Chart Placeholder'}
          {metric === 'revenue' && 'Revenue Trend Chart Placeholder'}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Pages">
          <div className="space-y-3">
            {data.topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="truncate">{page.page}</span>
                <span className="font-semibold">{formatNumber(page.views)} views</span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card title="Traffic Sources">
          <div className="space-y-3">
            {data.trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span>{source.source}</span>
                  <span>{source.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded h-2">
                  <div 
                    className="h-2 rounded bg-blue-500" 
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTrends;