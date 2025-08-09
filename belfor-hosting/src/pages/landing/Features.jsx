import { FeatureGrid } from '../../components/landing';
import { Container, Row, Col } from 'react-bootstrap';

export default function Features() {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col className="text-center">
          <h1>All the Features You Need</h1>
          <p className="lead">Our hosting plans include everything to get you started</p>
        </Col>
      </Row>
      
      <FeatureGrid detailed={true} />
      
      <Row className="mt-5">
        <Col className="text-center">
          <h2>Still have questions?</h2>
          <p>
            <a href="/support" className="btn btn-primary mt-3">
              Contact Support
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}