import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomePage = React.lazy(() => {
  return import('../Pages/HomePage/HomePage');
});

const ContactPage = React.lazy(() => {
  return import('../Pages/ContactPage/ContactPage');
});

const AboutPage = React.lazy(() => {
  return import('../Pages/AboutPage/AboutPage');
});

export const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <Suspense fallback={'Loading...'}>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
      </Suspense>
    </Switch>
  );
};

export default Routes;
