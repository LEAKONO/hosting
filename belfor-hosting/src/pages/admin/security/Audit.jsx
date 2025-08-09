import React, { useState, useEffect } from 'react';
import { Card, Table, Loader } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const Audit = () => {
  const { getAuditLogs } = useAdmin();
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('last30');

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const data = await getAuditLogs(dateRange);
        setAuditLogs(data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditLogs();
  }, [dateRange, getAuditLogs]);

  const columns = [
    { header: 'Timestamp', accessor: 'timestamp', format: formatDate },
    { header: 'User', accessor: 'username' },
    { header: 'Action', accessor: 'action' },
    { header: 'Entity', accessor: 'entity' },
    { header: 'Entity ID', accessor: 'entityId' },
    { header: 'Details', accessor: 'details' },
    { header: 'IP Address', accessor: 'ipAddress' }
  ];

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Audit Trail</h1>
        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="last90">Last 90 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      <Card>
        <Table data={auditLogs} columns={columns} />
      </Card>
    </div>
  );
};

export default Audit;