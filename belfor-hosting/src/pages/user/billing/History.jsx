import { useState, useEffect } from 'react';
import { useBilling } from '../../../services/api/billing';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { Loader, Alert } from '../../../components/common';

export default function BillingHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getBillingHistory } = useBilling();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getBillingHistory();
        setTransactions(data);
      } catch (err) {
        setError('Failed to load billing history');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [getBillingHistory]);

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'success',
      pending: 'warning',
      failed: 'danger',
      refunded: 'info'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <Card>
      <Card.Header>
        <h5>Billing History</h5>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {loading ? (
          <Loader />
        ) : transactions.length === 0 ? (
          <p>No transactions found</p>
        ) : (
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.description}</td>
                  <td>${tx.amount.toFixed(2)}</td>
                  <td>{getStatusBadge(tx.status)}</td>
                  <td>
                    <Button variant="link" size="sm" href={`/user/billing/invoices/${tx.invoiceId}`}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}