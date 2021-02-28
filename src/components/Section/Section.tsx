import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import classes from '@components/Section/section.css';

interface ContainerProps {
  children: React.ReactNode;
}

export const Section = ({ children }: ContainerProps): React.ReactElement => {
  return (
    <Container bsPrefix={classes.container}>
      <Row>{children}</Row>
    </Container>
  );
};
