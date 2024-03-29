import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardDeck from 'react-bootstrap/CardDeck';

import { InfoCard } from '@components/Layout/InfoCard';
import { Section } from '@components/Layout/Section';

export const InfoSection = (): React.ReactElement => {
  return (
    <Section>
      <Row className="justify-content-center">
        <Col md={5}>
          <CardDeck>
            <InfoCard title="Interesting" text="Details for this" link="visit" />
            <InfoCard title="Interesting" text="Details for this" link="click here" />
            <InfoCard title="Interesting" text="Details for this" link="search" />
          </CardDeck>
        </Col>
      </Row>
    </Section>
  );
};
