import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Section } from '@components/Layout/Section';
import classes from '@components/About/about.css';

export const About = (): React.ReactElement => {
  return (
    <Section>
      <Row className="justify-content-md-center">
        <Col className={`${classes.col} col-lg-5 col`} xs lg="5">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum architecto quos exercitationem, sed mollitia, ipsum
            sit eaque inventore, odio natus omnis assumenda excepturi aperiam! Hic repudiandae quia ad quos eveniet.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          1 of 3
        </Col>
        <Col xs lg="2">
          Variable width content
        </Col>
        <Col xs lg="2">
          3 of 3
        </Col>
      </Row>
    </Section>
  );
};
