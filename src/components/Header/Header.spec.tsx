import React, { Suspense, ReactElement } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { Header } from '@components/Header';
import * as headerUtility from '@components/Header/headerUtility';

import { MockStorage } from '../../mocks/MockStorage';

function renderWithRoutes(App: ReactElement, title = 'home', url = '/') {
  window.history.pushState({}, title, url);
  return render(App, { wrapper: Router });
}

describe('<Header/>', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new MockStorage(),
    });
  });

  it('should contain Navbar', () => {
    expect.assertions(1);
    const { getByRole } = render(<Header />, { wrapper: Router });
    expect(getByRole('navigation')).toBeInTheDocument();
  });

  it('should render the Home page', async () => {
    expect.assertions(2);
    const App = React.lazy(() => import('../routes'));
    const { getByText } = renderWithRoutes(
      <Suspense fallback={null}>
        <App />
      </Suspense>,
    );
    await waitFor(() => expect(document.querySelector('[href="/"]') as HTMLAnchorElement).toBeInTheDocument());
    await waitFor(() => expect(getByText(/home page/i)).toBeInTheDocument());
  });

  it('should render the About page', async () => {
    expect.assertions(2);
    const App = React.lazy(() => import('../routes'));
    const { getByText } = renderWithRoutes(
      <Suspense fallback={null}>
        <App />
      </Suspense>,
    );
    await waitFor(() => expect(document.querySelector('[href="/about"]') as HTMLAnchorElement).toBeInTheDocument());
    userEvent.click(document.querySelector('[href="/about"]') as HTMLAnchorElement);
    await waitFor(() => expect(getByText(/about page/i)).toBeInTheDocument());
  });

  it('should render the Contact page', async () => {
    expect.assertions(2);
    const App = React.lazy(() => import('../routes'));
    const { getByText } = renderWithRoutes(
      <Suspense fallback={null}>
        <App />
      </Suspense>,
    );
    await waitFor(() => expect(document.querySelector('[href="/contact"]') as HTMLAnchorElement).toBeInTheDocument());
    userEvent.click(document.querySelector('[href="/contact"]') as HTMLAnchorElement);
    await waitFor(() => expect(getByText(/contact page/i)).toBeInTheDocument());
  });
});

describe('light-dark mode', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should set theme to dark-mode when saveThemeToStorage is called', () => {
    expect.assertions(3);
    render(<Header />, { wrapper: Router });
    const container = document.querySelector('[data-checkbox]') as HTMLInputElement;
    const spy = jest.spyOn(headerUtility, 'saveThemeToStorage');
    userEvent.click(container);

    expect(spy).toHaveBeenCalledWith('dark-mode');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('theme')).toBe('dark-mode');
  });

  it.skip('should set theme to light-mode when saveThemeToStorage is called', () => {
    expect.assertions(3);
    render(<Header />, { wrapper: Router });
    const spy = jest.spyOn(headerUtility, 'saveThemeToStorage');

    const container = document.querySelector('[data-checkbox]') as HTMLInputElement;
    container.setAttribute('data-checkbox', 'dark-mode');
    expect(container.getAttribute('data-checkbox')).toBe('dark-mode');
    // userEvent.click(container);

    expect(spy).toHaveBeenCalledWith('dark-mode');
    expect(spy).toHaveBeenCalledTimes(1);
    // headerUtility.saveThemeToStorage('light-mode');
    // expect(window.localStorage.getItem('theme')).toBe('light-mode');
    // userEvent.click(container);
    // expect(window.localStorage.getItem('theme')).toBe('dark-mode');
  });

  it('should set theme in localStorage to light-mode if localStorage property is undefined', async () => {
    expect.assertions(1);
    render(<Header />, { wrapper: Router });
    window.localStorage.clear();
    const spy = jest.spyOn(headerUtility, 'saveThemeToStorage');

    expect(window.localStorage.getItem('theme')).toBeUndefined();

    const container = document.querySelector('[data-checkbox]') as HTMLInputElement;
    userEvent.click(container);
    headerUtility.saveThemeToStorage('light-mode');
    // expect(headerUtility.saveThemeToStorage).toHaveBeenCalledTimes(1);

    // expect(window.localStorage.getItem('theme')).toBe('light-mode');
  });
});
