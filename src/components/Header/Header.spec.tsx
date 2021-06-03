import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from '@components/Header';

// type RouteProps = {
//   title?: string;
//   url?: string;
// };

interface RoutesProps {
  App: React.ReactElement;
  title: string;
  url: string;
}

function renderWithRoutes(App: React.ReactElement, title = 'home', url = '/') {
  window.history.pushState({}, title, url);
  return render(App, { wrapper: Router });
}

describe('<Header/>', () => {
  it('should contain Navbar', () => {
    expect.assertions(1);
    const { getByRole } = render(<Header />, { wrapper: Router });
    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('should render the Home page', async () => {
    expect.assertions(1);
    const App = React.lazy(() => import('../routes'));
    const { getByText } = renderWithRoutes(
      <Suspense fallback={null}>
        <App />
      </Suspense>,
    );
    await waitFor(() => expect(getByText(/home page/gi)).toBeInTheDocument());
  });

  it('should render the About page', async () => {
    expect.assertions(1);
    const App = React.lazy(() => import('../routes'));
    const { getByText } = renderWithRoutes(
      <Suspense fallback={null}>
        <App />
      </Suspense>,
      'about',
      '/about',
    );
    await waitFor(() => expect(getByText(/about page/gi)).toBeInTheDocument());
  });

  it('should render the Contact page', async () => {
    expect.assertions(1);
    const App = React.lazy(() => import('../routes'));
    const { getByText } = renderWithRoutes(
      <Suspense fallback={null}>
        <App />
      </Suspense>,
      'contact',
      '/contact',
    );
    await waitFor(() => expect(getByText(/contact page/gi)).toBeInTheDocument());
  });
});
