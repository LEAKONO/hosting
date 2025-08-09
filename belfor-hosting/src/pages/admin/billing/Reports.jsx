import React, { useState, useEffect } from 'react';
import { Card, Loader } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatCurrency } from '../../utils/formatters';

const Reports = () => {
  const { getBillingReports } = useAdmin();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getBillingReports(dateRange);
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [dateRange, getBillingReports]);

  const handleDateChange = (e) => {
    setDateRange(e.target.value);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Billing Reports</h1>
        <select 
          value={dateRange} 
          onChange={handleDateChange}
          className="px-4 py-2 border rounded"
        >
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="last90">Last 90 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Revenue">
          <p className="text-3xl font-semibold">
            {formatCurrency(reports.totalRevenue)}
          </p>
        </Card>
        <Card title="Active Subscriptions">
          <p className="text-3xl font-semibold">{reports.activeSubscriptions}</p>
        </Card>
        <Card title="Churn Rate">
          <p className="text-3xl font-semibold">{reports.churnRate}%</p>
        </Card>
      </div>

      <div className="mt-8">
        <Card title="Revenue Trends">
          {/* Chart would go here */}
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
            Revenue Chart Placeholder
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;