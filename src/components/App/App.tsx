import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes } from '@components/routes';
import '@styles/main.css';

export const App = (): React.ReactElement | never => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (MOCK_SERVICE_WORKER) {
      import('../../mocks/browser').then(worker => {
        worker.default.start();
        setShow(true);
      });
    } else {
      setShow(true);
    }
  }, []);

  return <Router>{show && <Routes />}</Router>;
};

export default App;
