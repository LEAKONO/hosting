import React, { useState, useEffect } from 'react';
import { Card, Loader, Alert } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency, formatDate } from '../../utils/formatters';

const DashboardOverview = () => {
  const { getDashboardOverview } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardOverview();
        setData(response);
      } catch (error) {
        setError(error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getDashboardOverview]);

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!data) return <Alert variant="warning">No data available</Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Active Services">
          <p className="text-3xl font-semibold">{data.activeServices}</p>
          <p className="text-sm text-gray-600">
            {data.servicesDueSoon} due soon
          </p>
        </Card>
        
        <Card title="Open Tickets">
          <p className="text-3xl font-semibold">{data.openTickets}</p>
          <p className="text-sm text-gray-600">
            {data.recentlyClosedTickets} recently closed
          </p>
        </Card>
        
        <Card title="Next Invoice">
          <p className="text-3xl font-semibold">
            {formatCurrency(data.nextInvoiceAmount)}
          </p>
          <p className="text-sm text-gray-600">
            Due {formatDate(data.nextInvoiceDate)}
          </p>
        </Card>
        
        <Card title="Account Credit">
          <p className="text-3xl font-semibold">
            {formatCurrency(data.accountCredit)}
          </p>
          <p className="text-sm text-gray-600">
            {data.creditExpiry ? `Expires ${formatDate(data.creditExpiry)}` : 'No expiry'}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card title="Recent Activity">
            <div className="space-y-4">
              {data.recentActivity.map((activity, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <Card title="Quick Links">
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
              Order New Service
            </button>
            <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
              Open Support Ticket
            </button>
            <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
              Make Payment
            </button>
            <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
              Domain Management
            </button>
          </div>
        </Card>
      </div>

      <Card title="Recent Invoices">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Invoice #</th>
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Due Date</th>
                <th className="text-left py-2 px-4">Amount</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.recentInvoices.map((invoice, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{invoice.number}</td>
                  <td className="py-2 px-4">{formatDate(invoice.date)}</td>
                  <td className="py-2 px-4">{formatDate(invoice.dueDate)}</td>
                  <td className="py-2 px-4">{formatCurrency(invoice.amount)}</td>
                  <td className="py-2 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;