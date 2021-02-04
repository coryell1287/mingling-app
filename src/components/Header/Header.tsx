import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

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
        <Nav>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">About</Nav.Link>
          <Nav.Link href="#link">Contact</Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
}
