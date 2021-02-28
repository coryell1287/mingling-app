import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Section } from '@components/Layout/Section';

export const About = (): React.ReactElement => {
  return (
    <Section>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum laboriosam saepe ea architecto assumenda
            laudantium, facilis autem suscipit, porro aliquid incidunt ad excepturi odit hic veniam minus voluptatem vitae
            dolores?
          </p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          1 of 3
        </Col>
        <Col md="auto">Variable width content</Col>
        <Col xs lg="2">
          3 of 3
        </Col>
      </Row>
    </Section>
  );
};
