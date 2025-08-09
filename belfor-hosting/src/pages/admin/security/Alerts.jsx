import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge, Alert } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const Alerts = () => {
  const { getSecurityAlerts } = useAdmin();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getSecurityAlerts(selectedSeverity);
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, [selectedSeverity, getSecurityAlerts]);

  const columns = [
    { header: 'Alert ID', accessor: 'id' },
    { header: 'Date', accessor: 'timestamp', format: formatDate },
    { header: 'Type', accessor: 'type' },
    { 
      header: 'Severity', 
      cell: (row) => (
        <Badge 
          variant={
            row.severity === 'high' ? 'danger' : 
            row.severity === 'medium' ? 'warning' : 'info'
          }
        >
          {row.severity}
        </Badge>
      )
    },
    { header: 'Description', accessor: 'description' },
    { header: 'Status', accessor: 'status' }
  ];

  const handleAcknowledge = (id) => {
    // API call to acknowledge alert
    console.log('Acknowledging alert:', id);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Alerts</h1>
      
      <div className="mb-6">
        <Alert variant="warning">
          You have {alerts.filter(a => a.status === 'unacknowledged').length} unacknowledged alerts.
        </Alert>
      </div>

      <div className="flex justify-between items-center mb-4">
        <select 
          value={selectedSeverity} 
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Severities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Acknowledge All
        </button>
      </div>

      <Card>
        <Table 
          data={alerts} 
          columns={columns} 
          onRowClick={(row) => handleAcknowledge(row.id)}
        />
      </Card>
    </div>
  );
};

export default Alerts;