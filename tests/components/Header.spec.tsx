import React from 'react';
import { render, screen } from '@testing-library/react';

import { Header } from '@components/Header';

describe('<Header/>', function () {
  it('should load Header', function () {
    const component = render(<Header />);
    expect(component).toBeTruthy();
  });

  it('should contain Navbar', function () {
    render(<Header />);
    expect(screen.getByRole('navigation')).toBeTruthy();
  });

  it('should contain the Image wrapper', function () {
    render(<Header />);
    expect(screen.getAllByTestId('theme-button')).toBeTruthy();
  });
});
