import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header, saveThemeToStorage } from '@components/Header';

import { MockStorage } from '../../mocks/MockStorage';

function renderWithRoutes(App: React.ReactElement, title = 'home', url = '/') {
  window.history.pushState({}, title, url);
  return render(App, { wrapper: Router });
}

describe('<Header/>', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new MockStorage(),
    });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

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
    await waitFor(() => expect(getByText(/home page/gi)).toBeInTheDocument(), { timeout: 3000 });
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

  it('should set theme in localStorage to light-mode if localStorage property is undefined', () => {
    expect.assertions(2);
    expect(window.localStorage.getItem('theme')).toBeUndefined();
    saveThemeToStorage('light-mode');
    expect(window.localStorage.getItem('theme')).toBe('light-mode');
  });

  it('should set theme to dark-mode when saveThemeToStorage is called', () => {
    expect.assertions(1);
    saveThemeToStorage('dark-mode');
    expect(window.localStorage.getItem('theme')).toBe('dark-mode');
  });
});
