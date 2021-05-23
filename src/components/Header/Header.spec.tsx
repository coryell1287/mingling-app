import React from 'react';
import { render } from '@testing-library/react';

import { Header } from '@components/Header';

let container: HTMLDivElement;

describe('<Header/>', () => {
  beforeEach(() => {
    container = document.createElement('div');
    container.setAttribute('id', 'root');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should load Header', () => {
    expect.assertions(1);
    const component = render(<Header />, { container });
    expect(component).toBeTruthy();
  });

  it('should contain Navbar', () => {
    expect.assertions(1);
    const { getByRole } = render(<Header />, { container });
    expect(getByRole('navigation')).toBeTruthy();
  });

  it('should contain the Image wrapper', () => {
    expect.assertions(1);
    const { getAllByTestId } = render(<Header />);
    expect(getAllByTestId('theme-button')).toBeTruthy();
  });
});
