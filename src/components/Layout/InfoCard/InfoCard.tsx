import React from 'react';
import Card from 'react-bootstrap/Card';

import classes from '@components/Layout/InfoCard/infoCard.css';
interface CardProps {
  title: string;
  text: string;
  subtitle?: string;
  link?: string;
}

export const InfoCard = ({ title, text, subtitle, link }: CardProps): React.ReactElement => {
  return (
    <Card bsPrefix={`${classes.card} card`} style={{ width: '18rem' }} data-testid="info-card">
      <Card.Body>
        <Card.Title as="h5">{title}</Card.Title>
        <Card.Subtitle as="h6">{subtitle}</Card.Subtitle>
        <Card.Text>{text}</Card.Text>
        {Boolean(link?.length) && (
          <Card.Link data-testid="link" className={`${classes.cardLink} btn btn-primary`}>
            {link}
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};
