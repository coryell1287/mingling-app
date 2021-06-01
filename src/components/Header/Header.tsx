import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
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
        <ButtonGroup>
          <Button variant="link">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link">
            <Link to="/about">About</Link>
          </Button>
          <Button variant="link">
            <Link to="/contact">Contact</Link>
          </Button>
        </ButtonGroup>
      </Navbar>
    </header>
  );
}
