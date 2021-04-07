import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ContactForm = (): React.ReactElement => {
  return (
    <Row className="justify-content-center">
      <Col md={5}>
        <Form>
          <Form.Group controlId="contactFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" data-testid="name"></Form.Control>
          </Form.Group>
          <Form.Group controlId="contactFormEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" data-testid="email"></Form.Control>
          </Form.Group>
          <Form.Group controlId="textArea">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} data-testid="textarea"></Form.Control>
          </Form.Group>
          <Button variant="primary" data-testid="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};
