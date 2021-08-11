import React, { ChangeEvent, ReactElement, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { ThemeSwitcher } from '@components/ThemeSwitcher';
import classes from '@components/Header/header.css';
import { useStorage } from '@components/ThemeSwitcher/useStorage';
import { saveThemeToStorage } from '@components/Header/headerUtility';

export function Header(): ReactElement {
  const [mode, setMode] = useState<Theme>();
  const theme = useStorage('theme');

  React.useEffect(() => {
    if (!theme) {
      setMode('light-mode');
      saveThemeToStorage('light-mode');
    } else if (theme) {
      setMode(theme as Theme);
      saveThemeToStorage(theme as Theme);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const mode = e.target.dataset.mode;
    if (mode === 'light-mode') {
      saveThemeToStorage('dark-mode');
      setMode('dark-mode');
    } else if (mode === 'dark-mode') {
      saveThemeToStorage('light-mode');
      setMode('light-mode');
    }
  };

  return (
    <header>
      <Navbar
        role="navigation"
        bg={mode === 'dark-mode' ? 'dark' : 'light'}
        expand="lg"
        className={`justify-content-around ${classes.padding}`}
      >
        <Navbar.Brand>
          <ThemeSwitcher mode={mode as Theme} onHandleCheck={handleChange} />
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
