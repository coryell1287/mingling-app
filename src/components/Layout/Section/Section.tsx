import React from 'react';
import Container from 'react-bootstrap/Container';

import classes from '@components/Layout/Section/section.css';

type ContainerProps = {
  children: React.ReactNode;
};

export const Section = ({ children }: ContainerProps): React.ReactElement => {
  return <Container bsPrefix={classes.container}>{children}</Container>;
};
