import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const UserActivity = () => {
  const { getUserActivityLogs } = useAdmin();
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdFilter, setUserIdFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  useEffect(() => {
    const fetchActivityLogs = async () => {
      try {
        const data = await getUserActivityLogs(userIdFilter, actionFilter);
        setActivityLogs(data);
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivityLogs();
  }, [userIdFilter, actionFilter, getUserActivityLogs]);

  const columns = [
    { header: 'User ID', accessor: 'userId' },
    { header: 'Name', accessor: 'userName' },
    { header: 'Action', accessor: 'action' },
    { header: 'IP Address', accessor: 'ipAddress' },
    { header: 'Timestamp', accessor: 'timestamp', format: formatDate },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={row.status === 'success' ? 'success' : 'danger'}
        >
          {row.status}
        </Badge>
      )
    }
  ];

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Activity Logs</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="text"
              placeholder="Filter by user ID"
              value={userIdFilter}
              onChange={(e) => setUserIdFilter(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Action</label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 border rounded"
            >
              <option value="all">All Actions</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="service_create">Service Created</option>
              <option value="service_update">Service Updated</option>
              <option value="payment">Payment</option>
            </select>
          </div>
        </div>
      </div>

      <Card>
        <Table data={activityLogs} columns={columns} />
      </Card>
    </div>
  );
};

export default UserActivity;