import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

const TicketList = () => {
  const { getSupportTickets } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('open');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getSupportTickets(statusFilter);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching support tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [statusFilter, getSupportTickets]);

  const columns = [
    { header: 'Ticket #', accessor: 'id' },
    { header: 'Subject', accessor: 'subject' },
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
    { header: 'Last Update', accessor: 'lastUpdated', format: formatDate },
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

  const handleRowClick = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
          <option value="all">All Tickets</option>
        </select>
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

export default TicketList;