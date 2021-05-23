import React from 'react';
import { render } from '@testing-library/react';

import { BannerImage } from '@components/BannerImage';

describe('<BannerImage/>', () => {
  it('should load the BannerImage component', () => {
    expect.assertions(1);
    const { getByText } = render(<BannerImage />);
    expect(getByText(/banner image/i)).toBeInTheDocument();
  });
});
