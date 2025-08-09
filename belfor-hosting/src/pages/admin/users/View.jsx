import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Loader, Badge, Alert, Table } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate, formatCurrency } from '../../utils/formatters';

const UserView = () => {
  const { id } = useParams();
  const { getUserDetails } = useAdmin();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails(id);
        setUser(data);
      } catch (error) {
        setError(error.message || 'Failed to load user details');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, getUserDetails]);

  const serviceColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Type', accessor: 'type' },
    { header: 'Domain', accessor: 'domain' },
    { header: 'Created', accessor: 'createdAt', format: formatDate },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={
            row.status === 'active' ? 'success' : 
            row.status === 'suspended' ? 'warning' : 'danger'
          }
        >
          {row.status}
        </Badge>
      )
    },
    { header: 'Next Due', accessor: 'nextDueDate', format: formatDate }
  ];

  const invoiceColumns = [
    { header: 'Invoice #', accessor: 'number' },
    { header: 'Date', accessor: 'date', format: formatDate },
    { header: 'Amount', accessor: 'amount', format: formatCurrency },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={
            row.status === 'paid' ? 'success' : 
            row.status === 'pending' ? 'warning' : 'danger'
          }
        >
          {row.status}
        </Badge>
      )
    },
    { header: 'Due Date', accessor: 'dueDate', format: formatDate }
  ];

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!user) return <Alert variant="warning">User not found</Alert>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Details</h1>
        <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
          {user.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gray-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            
            <div className="mt-4 w-full">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Joined</span>
                <span>{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Last Active</span>
                <span>{formatDate(user.lastActive)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Timezone</span>
                <span>{user.timezone}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">2FA Enabled</span>
                <span>{user.twoFactorEnabled ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="lg:col-span-2 space-y-6">
          <Card title="Account Summary">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-medium text-gray-600 mb-1">Active Services</h3>
                <p className="text-3xl font-bold">{user.services.length}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-medium text-gray-600 mb-1">Total Spent</h3>
                <p className="text-3xl font-bold">{formatCurrency(user.totalSpent)}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-medium text-gray-600 mb-1">Open Tickets</h3>
                <p className="text-3xl font-bold">{user.openTickets}</p>
              </div>
            </div>
          </Card>
          
          <Card title="Recent Activity">
            <div className="space-y-3">
              {user.recentActivity.map((activity, index) => (
                <div key={index} className="border-b pb-3 last:border-0">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500">{formatDate(activity.timestamp)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      <Card title="Services" className="mb-6">
        <Table data={user.services} columns={serviceColumns} />
      </Card>
      
      <Card title="Invoices">
        <Table data={user.invoices} columns={invoiceColumns} />
      </Card>
    </div>
  );
};

export default UserView;