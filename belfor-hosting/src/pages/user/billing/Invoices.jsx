import { useState, useEffect } from 'react';
import { useBilling } from '../../../services/api/billing';
import { Card, Table, Button, Badge } from 'react-bootstrap';
import { Loader, Alert } from '../../../components/common';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getInvoices } = useBilling();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getInvoices();
        setInvoices(data);
      } catch (err) {
        setError('Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvoices();
  }, [getInvoices]);

  const getStatusBadge = (status) => {
    const variants = {
      paid: 'success',
      unpaid: 'danger',
      pending: 'warning',
      refunded: 'info'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>Invoices</h5>
        <Button variant="primary" size="sm" href="/user/billing/history">
          View Payment History
        </Button>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {loading ? (
          <Loader />
        ) : invoices.length === 0 ? (
          <p>No invoices found</p>
        ) : (
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.number}</td>
                  <td>{new Date(invoice.date).toLocaleDateString()}</td>
                  <td>${invoice.amount.toFixed(2)}</td>
                  <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                  <td>{getStatusBadge(invoice.status)}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      href={`/user/billing/invoices/${invoice.id}`}
                    >
                      View
                    </Button>
                    {invoice.status === 'unpaid' && (
                      <Button variant="link" size="sm" className="ms-2">
                        Pay Now
                      </Button>
                    )}
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