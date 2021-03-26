import React from 'react';
import { render, screen } from '@testing-library/react';

import { Header } from '@components/Header';

let container: HTMLDivElement;

describe('<Header/>', function () {
  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should load Header', function () {
    const component = render(<Header />, { container });
    expect(component).toBeTruthy();
  });

  it('should contain Navbar', function () {
    const { getByRole } = render(<Header />, { container });
    expect(getByRole('navigation')).toBeTruthy();
  });

  it('should contain the Image wrapper', function () {
    const { getAllByTestId } = render(<Header />);
    expect(getAllByTestId('theme-button')).toBeTruthy();
  });
});
