import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const Logs = () => {
  const { getSecurityLogs } = useAdmin();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logType, setLogType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getSecurityLogs(logType, searchQuery);
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [logType, searchQuery, getSecurityLogs]);

  const columns = [
    { header: 'Timestamp', accessor: 'timestamp', format: formatDate },
    { header: 'Type', accessor: 'type' },
    { 
      header: 'Level', 
      cell: (row) => (
        <Badge 
          variant={
            row.level === 'error' ? 'danger' : 
            row.level === 'warning' ? 'warning' : 'info'
          }
        >
          {row.level}
        </Badge>
      )
    },
    { header: 'User', accessor: 'username' },
    { header: 'IP Address', accessor: 'ipAddress' },
    { header: 'Message', accessor: 'message' }
  ];

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Security Logs</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <select 
            value={logType} 
            onChange={(e) => setLogType(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Types</option>
            <option value="authentication">Authentication</option>
            <option value="authorization">Authorization</option>
            <option value="system">System</option>
          </select>
        </div>
        
        <input
          type="text"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-64"
        />
      </div>

      <Card>
        <Table data={logs} columns={columns} />
      </Card>
    </div>
  );
};

export default Logs;