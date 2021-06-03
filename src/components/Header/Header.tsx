import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

import classes from '@components/Header/header.css';

export function Header(): React.ReactElement {
  return (
    <header>
      <Navbar role="navigation" bg="light" expand="lg" className="justify-content-around">
        <Navbar.Brand>
          Dark theme
          <Image
            data-testid="theme-button"
            role="button"
            className={`${classes.circle1} ${classes.circleBase}`}
            roundedCircle
          />
        </Navbar.Brand>
        <div className={classes.navigation}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </Navbar>
    </header>
  );
}
