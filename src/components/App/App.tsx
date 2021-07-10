import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from '@components/routes';
import '@styles/main.css';

export const App = (): React.ReactElement => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
