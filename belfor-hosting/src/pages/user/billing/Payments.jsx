import { useState, useEffect } from 'react';
import { useBilling } from '../../../services/api/billing';
import { Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Loader } from '../../../components/common';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const { getPendingPayments, makePayment } = useBilling();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getPendingPayments();
        setPayments(data);
      } catch (err) {
        setError('Failed to load pending payments');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPayments();
  }, [getPendingPayments]);

  const handlePayment = async () => {
    try {
      await makePayment(selectedInvoice.id, paymentMethod);
      setShowPaymentModal(false);
      // Refresh payments
      const data = await getPendingPayments();
      setPayments(data);
    } catch (err) {
      setError('Failed to process payment');
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>Pending Payments</h5>
        <Button 
          variant="primary" 
          size="sm" 
          href="/user/billing/history"
        >
          View Payment History
        </Button>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {loading ? (
          <Loader />
        ) : payments.length === 0 ? (
          <Alert variant="success">No pending payments found</Alert>
        ) : (
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.invoiceNumber}</td>
                  <td>{payment.description}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={() => {
                        setSelectedInvoice(payment);
                        setShowPaymentModal(true);
                      }}
                    >
                      Pay Now
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      className="ms-2"
                      href={`/user/billing/invoices/${payment.invoiceId}`}
                    >
                      View Invoice
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <>
              <p>
                You are about to pay <strong>${selectedInvoice.amount.toFixed(2)}</strong> for invoice{' '}
                <strong>#{selectedInvoice.invoiceNumber}</strong>.
              </p>
              
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="credit_card">Credit Card (ending in 4242)</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Confirm Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}