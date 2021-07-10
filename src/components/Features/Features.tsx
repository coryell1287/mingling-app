import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Section } from '@components/Layout/Section';
import classes from '@components/Features/features.css';

export const Features = (): React.ReactElement => {
  return (
    <Section>
      <Row>
        <Col className={`${classes.col} col-md-3 offset-md-3`} md={{ span: 3, offset: 3 }}>
          <h3>Features</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perspiciatis autem reprehenderit eligendi omnis id
            impedit, fugit nemo sed numquam voluptatibus quae necessitatibus quod, provident earum quas illum, aperiam
            reiciendis!
          </p>
        </Col>
        <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
      </Row>
    </Section>
  );
};
