import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/cypress';
import { BrowserRouter } from 'react-router-dom';

import { BannerImage } from '@components/BannerImage';

describe('<BannerImage/>', () => {
  it('should load the BannerImage component', () => {
    expect.assertions(1);
    const { getByText } = render(<BannerImage />, { wrapper: BrowserRouter });
    expect(getByText(/Jumbotron/i)).toBeInTheDocument();
  });
});
