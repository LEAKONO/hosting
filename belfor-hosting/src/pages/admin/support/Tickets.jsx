import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const SupportTickets = () => {
  const { getSupportTickets } = useAdmin();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('open');
  const [assignedFilter, setAssignedFilter] = useState('all');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getSupportTickets(statusFilter, assignedFilter);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching support tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [statusFilter, assignedFilter, getSupportTickets]);

  const columns = [
    { header: 'Ticket #', accessor: 'id' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Customer', accessor: 'customerName' },
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
    },
    { 
      header: 'Assigned', 
      cell: (row) => row.assignedTo || 'Unassigned'
    }
  ];

  const handleRowClick = (ticketId) => {
    navigate(`/admin/support/tickets/${ticketId}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex gap-4">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="closed">Closed</option>
            <option value="all">All</option>
          </select>
          
          <select 
            value={assignedFilter} 
            onChange={(e) => setAssignedFilter(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="all">All Tickets</option>
            <option value="me">Assigned to Me</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>

      <Card>
        <Table 
          data={tickets} 
          columns={columns} 
          onRowClick={(row) => handleRowClick(row.id)}
        />
      </Card>
    </div>
  );
};

export default SupportTickets;