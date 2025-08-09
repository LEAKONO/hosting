import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate } from '../../utils/formatters';

const Reminders = () => {
  const { getPaymentReminders } = useAdmin();
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await getPaymentReminders();
        setReminders(data);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, [getPaymentReminders]);

  const columns = [
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Email', accessor: 'customerEmail' },
    { header: 'Due Date', accessor: 'dueDate', format: formatDate },
    { header: 'Amount', accessor: 'amount' },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={row.status === 'sent' ? 'success' : 'warning'}
        >
          {row.status}
        </Badge>
      )
    },
    { header: 'Attempts', accessor: 'attempts' }
  ];

  const handleSendReminder = (id) => {
    // API call to send reminder
    console.log('Sending reminder for:', id);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Payment Reminders</h1>
      
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Pending Reminders</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Send All Reminders
          </button>
        </div>
        
        <Table 
          data={reminders} 
          columns={columns} 
          onRowClick={(row) => handleSendReminder(row.id)}
        />
      </Card>
    </div>
  );
};

export default Reminders;