import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const SupportQueue = () => {
  const { getSupportQueue } = useAdmin();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState('all');
  const [priority, setPriority] = useState('all');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getSupportQueue(department, priority);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching support queue:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [department, priority, getSupportQueue]);

  const columns = [
    { header: 'Ticket #', accessor: 'id' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Department', accessor: 'department' },
    { 
      header: 'Priority', 
      cell: (row) => (
        <Badge 
          variant={
            row.priority === 'high' ? 'danger' : 
            row.priority === 'medium' ? 'warning' : 'info'
          }
        >
          {row.priority}
        </Badge>
      )
    },
    { header: 'Created', accessor: 'createdAt', format: formatDate },
    { header: 'Last Reply', accessor: 'lastReply', format: formatDate },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={
            row.status === 'open' ? 'danger' : 
            row.status === 'pending' ? 'warning' : 'success'
          }
        >
          {row.status}
        </Badge>
      )
    }
  ];

  const handleAssignToMe = (ticketId) => {
    // API call to assign ticket
    console.log('Assigning ticket:', ticketId);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Queue</h1>
        <div className="flex gap-4">
          <select 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Departments</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="sales">Sales</option>
            <option value="general">General</option>
          </select>
          
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <Card>
        <Table 
          data={tickets} 
          columns={columns} 
          onRowClick={(row) => handleAssignToMe(row.id)}
        />
      </Card>
    </div>
  );
};

export default SupportQueue;