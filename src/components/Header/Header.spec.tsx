import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Routes as App } from '@components/routes';

type RouteProps = {
  title?: string;
  url?: string;
};

const renderWithRoutes = (App: React.ReactElement, { title = 'home', url = '/' }: RouteProps) => {
  window.history.pushState({}, title, url);
  return render(App, { wrapper: Router });
};

describe('<Header/>', () => {
  it('should contain Navbar', () => {
    expect.assertions(1);
    const { getByRole } = render(<App />, { wrapper: Router });
    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('should render the Home page', () => {
    expect.assertions(1);
    const { getByText } = render(<App />, { wrapper: Router });
    expect(getByText(/home page/gi)).toBeInTheDocument();
  });

  it('should render the About page', () => {
    expect.assertions(1);
    renderWithRoutes(<App />, { title: 'about', url: '/about' });
    expect(screen.getByText(/about page/gi)).toBeInTheDocument();
  });

  it('should render the Contact page', () => {
    expect.assertions(1);
    renderWithRoutes(<App />, { title: 'contact', url: '/contact' });
    expect(screen.getByText(/contact page/gi)).toBeInTheDocument();
  });
});
