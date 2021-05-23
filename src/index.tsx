import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { BannerImage } from '@components/BannerImage';
import { Header } from '@components/Header';
import { Head } from '@components/Head';
import { About } from '@components/About';
import { Features } from '@components/Features';
import { InfoSection } from '@components/InfoSection';
import { ContactUs } from '@components/ContactUs';

export function App(): React.ReactElement {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Head />
          <Header />
          <BannerImage />
          <About />
          <Features />
          <InfoSection />
          <ContactUs />
        </Route>
      </Switch>
    </Router>
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
