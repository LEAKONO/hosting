import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

const DomainList = () => {
  const { getDomains } = useAuth();
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const data = await getDomains(statusFilter);
        setDomains(data);
      } catch (error) {
        console.error('Error fetching domains:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, [statusFilter, getDomains]);

  const columns = [
    { header: 'Domain', accessor: 'name' },
    { header: 'Registration Date', accessor: 'registrationDate', format: formatDate },
    { header: 'Expiry Date', accessor: 'expiryDate', format: formatDate },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={
            row.status === 'active' ? 'success' : 
            row.status === 'expired' ? 'danger' : 'warning'
          }
        >
          {row.status}
        </Badge>
      )
    },
    { header: 'Auto Renew', accessor: 'autoRenew' },
    { header: 'Nameservers', accessor: 'nameservers' }
  ];

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Domains</h1>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <Card>
        <Table data={domains} columns={columns} />
      </Card>
    </div>
  );
};

export default DomainList;