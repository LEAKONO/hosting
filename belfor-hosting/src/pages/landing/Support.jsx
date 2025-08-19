import { useState } from 'react';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Support request submitted!');
  };

  const faqs = [
    {
      question: 'How do I migrate my existing website?',
      answer: 'We provide free migration services for all new customers...'
    },
    {
      question: 'What is your uptime guarantee?',
      answer: 'We offer a 99.9% uptime guarantee for all our hosting plans...'
    },
    // Add more FAQs
  ];

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <h1>Contact Support</h1>
          <p className="lead">We're here to help 24/7</p>
          
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit Request
            </Button>
          </Form>
        </Col>
        
        <Col md={6} className="mt-4 mt-md-0">
          <h2>FAQs</h2>
          <Accordion>
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          
          <div className="mt-4">
            <h3>Other Ways to Reach Us</h3>
            <ul className="list-unstyled">
              <li>Email: support@hostingplatform.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Live Chat: Available 24/7</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}