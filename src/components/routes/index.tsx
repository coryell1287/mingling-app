import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from '@components/HomePage';
import { ContactPage } from '@components/ContactPage';
import { AboutPage } from '@components/AboutPage';

export const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
      <Route path="/contact">
        <ContactPage />
      </Route>
    </Switch>
  );
};
