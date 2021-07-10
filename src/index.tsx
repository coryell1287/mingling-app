import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '@components/App';

import reportWebVitals from './reportVitals';

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();

if (MOCK_SERVICE_WORKER) {
  import('./mocks/browser').then(worker => {
    worker.default.start();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
