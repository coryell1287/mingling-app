import React from 'react';
import ReactDOM from 'react-dom';

import { Home } from '@components/Home';
import { Header } from '@components/Header';
import { Head } from '@components/Head';
import { About } from '@components/About';

export function App(): React.ReactElement {
  return (
    <div>
      <Head />
      <Header />
      <Home />
      <About />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

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
