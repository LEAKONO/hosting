import { useState, useEffect } from 'react';
import { useBilling } from '../../../services/api/billing';
import { Card, ListGroup, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Loader } from '../../../components/common';

export default function PaymentMethods() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    isDefault: false
  });
  const { getPaymentMethods, addPaymentMethod } = useBilling();

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const data = await getPaymentMethods();
        setMethods(data);
      } catch (err) {
        setError('Failed to load payment methods');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMethods();
  }, [getPaymentMethods]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPaymentMethod(formData);
      setShowAddModal(false);
      // Refresh methods
      const data = await getPaymentMethods();
      setMethods(data);
    } catch (err) {
      setError('Failed to add payment method');
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>Payment Methods</h5>
        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          Add Payment Method
        </Button>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        {loading ? (
          <Loader />
        ) : methods.length === 0 ? (
          <p>No payment methods found</p>
        ) : (
          <ListGroup variant="flush">
            {methods.map((method) => (
              <ListGroup.Item key={method.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{method.brand}</strong> ending in {method.last4}
                  {method.isDefault && (
                    <Badge bg="success" className="ms-2">Default</Badge>
                  )}
                </div>
                <div>
                  <Button variant="outline-danger" size="sm" className="me-2">
                    Remove
                  </Button>
                  {!method.isDefault && (
                    <Button variant="outline-primary" size="sm">
                      Set as Default
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment Method</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </Form.Group>
            
            <div className="row">
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </Form.Group>
              
              <Form.Group className="col-md-6 mb-3">
                <Form.Label>CVC</Form.Label>
                <Form.Control
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </Form.Group>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Label>Name on Card</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            
            <Form.Check
              type="checkbox"
              label="Set as default payment method"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleInputChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Payment Method
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Card>
  );
}