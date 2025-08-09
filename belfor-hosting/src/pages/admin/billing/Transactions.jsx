import React, { useState, useEffect } from 'react';
import { Card, Table, Loader, Badge } from '../../components/common';
import { useAdmin } from '../../hooks/useAdmin';
import { formatDate, formatCurrency } from '../../utils/formatters';

const Transactions = () => {
  const { getTransactions } = useAdmin();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions(filter);
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [filter, getTransactions]);

  const columns = [
    { header: 'Transaction ID', accessor: 'id' },
    { header: 'Date', accessor: 'date', format: formatDate },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Amount', accessor: 'amount', format: formatCurrency },
    { 
      header: 'Status', 
      cell: (row) => (
        <Badge 
          variant={
            row.status === 'completed' ? 'success' : 
            row.status === 'failed' ? 'danger' : 'warning'
          }
        >
          {row.status}
        </Badge>
      )
    },
    { header: 'Payment Method', accessor: 'paymentMethod' }
  ];

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All Transactions</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <Card>
        <Table data={transactions} columns={columns} />
      </Card>
    </div>
  );
};

export default Transactions;